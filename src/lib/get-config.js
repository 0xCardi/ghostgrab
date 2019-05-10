const bole = require('bole');
const envPaths = require('env-paths');
const fs = require('fs');
const mkdirp = require('mkdirp');

const pkg = require('../../package');
const paths = envPaths(pkg.name, { suffix: '' });
const log = bole(pkg.name);

module.exports = () => {
    mkdirp.sync(paths.config);

    const file = paths.config + '/ghostgrab.json';

    let config;

    try {
        // using require caches results here, and they might change the data
        config = JSON.parse(fs.readFileSync(file));
        log.info(`previous config found ${file}`);
    } catch (e) {
        console.log(e);
        config = require('../../default-config');
        fs.writeFileSync(file, JSON.stringify(config, null, '    '));
        log.info(`created new config at ${file}`);
    }

    return config;
};
