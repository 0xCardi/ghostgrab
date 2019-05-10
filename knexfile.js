// http://knexjs.org/#knexfile

const envPaths = require('env-paths');
const mkdirp = require('mkdirp');

const pkg = require('./package.json');
const paths = envPaths(pkg.name, { suffix: '' });

mkdirp.sync(paths.data);

module.exports = {
    development: {
        client: 'sqlite3',
        connection: { filename: paths.data + '/ghostgrab.sqlite3' },
        useNullAsDefault: true
    },
    production: {
        client: 'sqlite3',
        connection: { filename: paths.data + '/ghostgrab.sqlite3' },
        useNullAsDefault: true
    }
};
