// the webserver

const Router = require('router');
const Tokens = require('csrf');
const bole = require('bole');
const envPaths = require('env-paths');
const fs = require('fs');
const http = require('http');
const knex = require('knex');
const mkdirp = require('mkdirp');
const os = require('os');
const routes = require('./lib/routes');
const serveStatic = require('serve-static');
const sessionSecret = require('./lib/session-secret');
const sessions = require('client-sessions');
const tcpBind = require('tcp-bind');
const sendBody = require('./lib/send-body');

const IS_DEV = process.env.NODE_ENV !== 'production';
const ONE_DAY = 60 * 60 * 24;

bole.output({ level: 'info', stream: process.stdout });

const pkg = require('../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);
const router = new Router();
const serve = serveStatic('res');
const session = sessions({
    cookieName: pkg.name + '-session',
    secret: sessionSecret(),
    duration: ONE_DAY * 30
});
const tokens = new Tokens();

try {
    mkdirp.sync(paths.config);
    mkdirp.sync(paths.data);
    mkdirp.sync(paths.cache + '/artist-img');
    mkdirp.sync(paths.cache + '/album-img');
} catch (e) {
    // most likely permission issue
    log.error(e);
}

const KNEX_PATH = paths.config + '/knexfile.json';

let knexFile;

try {
    knexFile = require(KNEX_PATH);
    log.info(`found knex file in ${KNEX_PATH}`);
} catch (e) {
    log.info(`no knexfile found in ${KNEX_PATH}, creating...`);
    knexFile = require('../knexfile');
    fs.writeFileSync(KNEX_PATH, JSON.stringify(knexFile, null, '    '));
}

const db = knex(knexFile[(IS_DEV ? 'development' : 'production')]);
db.on('query', query => log.info('query: ', query.sql, query.bindings))

routes(router, tokens, db, null);

db.migrate.latest().asCallback((err) => {
    if (err) {
        return log.err('database', err);
    }

    log.info('database is migrated to latest schemas');
});

const server = http.createServer((req, res) => {
    // https://www.owasp.org/index.php/OWASP_Secure_Headers_Project
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1');

    serve(req, res, () => {
        res.statusCode = 200;

        session(req, res, () => {
            router(req, res, () => {
                res.statusCode = 404;
                sendBody.json(req, res, 'not found');
            });
        });
    });
});

server.on('error', err => log.error('http', err));

let httpPort = +process.argv[2];
httpPort = isNaN(httpPort) ? 3333 : httpPort;

server.listen(httpPort, () => {
    log.info(`http server listening on ${httpPort}`);
});
