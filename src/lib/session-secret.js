// https://www.npmjs.com/package/client-sessions#cryptography
// generate and cache a secret. this prevents invalidated sessions on server
// restart.

const bole = require('bole');
const crypto = require('crypto');
const envPaths = require('env-paths');
const fs = require('fs');
const mkdirp = require('mkdirp');

const pkg = require('../../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);

mkdirp.sync(paths.data);

module.exports = () => {
    const file = paths.data + '/session-secret';

    let secret;

    try {
        secret = fs.readFileSync(file, 'utf8');
        log.info(`previous session secret found ${file}`);
    } catch (e) {
        secret = crypto.randomBytes(128).toString();
        fs.writeFileSync(file, secret);
        log.info(`created new session secret at ${file}`);
    }

    return secret;
};
