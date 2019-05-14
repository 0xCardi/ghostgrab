// the webserver

const attachRoutes = require('./routes');
const bole = require('bole');
const compression = require('compression');
const envPaths = require('env-paths');
const express = require('express');
const fs = require('fs');
const knex = require('knex');
const mkdirp = require('mkdirp');
const os = require('os');
const sessionSecret = require('./lib/session-secret');
const sessions = require('client-sessions');
const tcpBind = require('tcp-bind');

const IS_DEV = process.env.NODE_ENV !== 'production';
const ONE_DAY = 60 * 60 * 24;

bole.output({ level: 'info', stream: process.stdout });

const pkg = require('../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);

try {
    mkdirp.sync(paths.config);
    mkdirp.sync(paths.data);
    mkdirp.sync(paths.cache + '/images/albums');
    mkdirp.sync(paths.cache + '/images/artists');
    mkdirp.sync(paths.cache + '/images/avatars');
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

db.migrate.latest().asCallback((err) => {
    if (err) {
        return log.err('database', err);
    }

    log.info('database is migrated to latest schemas');
});

db.on('query', query => log.info('query:', query.sql, query.bindings))

const app = express();
app.use((req, res, next) => {
    // https://www.owasp.org/index.php/OWASP_Secure_Headers_Project
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1');

    res.json = obj => {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        res.end(JSON.stringify(obj), 'utf8');
    };

    next();
});

app.use(compression());

const staticify = require('staticify')('./res');
app.use(staticify.middleware);

app.use(sessions({
    cookieName: 'session',
    secret: sessionSecret(),
    duration: ONE_DAY * 30
}));

app.set('staticify', staticify);
app.set('db', db);
attachRoutes(app);

app.use((req, res) => {
    res.statusCode = 404;
    res.json('not found');
});

let httpPort = +process.argv[2];
httpPort = isNaN(httpPort) ? 3333 : httpPort;

const server = app.listen(httpPort, () => {
    log.info(`http server listening at http;//localhost:${httpPort}`);
});

server.on('error', err => log.error('http', err));
