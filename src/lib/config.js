const bole = require('bole');
const envPaths = require('env-paths');
const fs = require('fs');
const mkdirp = require('mkdirp');

const pkg = require('../../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);

mkdirp.sync(paths.config);
const FILE = paths.config + '/ghostgrab.json';

function getConfig() {
    let config;

    try {
        // using require caches results here, and they might change the data
        config = JSON.parse(fs.readFileSync(FILE));
        log.info(`previous config found ${FILE}`);
    } catch (e) {
        console.log(e);
        config = require('../../default-config');
        fs.writeFileSync(FILE, JSON.stringify(config, null, '    '));
        log.info(`created new config at ${FILE}`);
    }

    return config;
}

function setConfig(obj) {
    let config = getConfg();
    Object.keys(obj).forEach(key => config[key] = obj[key]);
    fs.writeFileSync(FILE, JSON.stringify(config, null, '   '));
}

module.exports.get = getConfig;
module.exports.set = setConfig;
