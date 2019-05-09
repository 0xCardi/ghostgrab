// the webserver

const bole = require('bole');
const cluster = require('cluster');
const envPaths = require('env-paths');
const fs = require('fs');
const http = require('http');
const knex = require('knex');
const mkdirp = require('mkdirp');
const os = require('os');
const serveStatic = require('serve-static');
const sessions = require('client-sessions');
const tcpBind = require('tcp-bind');

bole.output({ level: 'info', stream: process.stdout });

const pkg = require('../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);

try {
    mkdirp.sync(paths.config);
    mkdirp.sync(paths.data);
    // ~/.
} catch (e) {
    // most likely permission issue
    log.error(e);
}

const IS_DEV = process.env.NODE_ENV !== 'production';
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

db.migrate.latest().asCallback((err) => {
    if (err) {
        return log.err(err);
    }

    log.info('successfully populated table');
});
