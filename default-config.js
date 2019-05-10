// default configuration for livelook and our module

const envPaths = require('env-paths');
const os = require('os');

const pkg = require('./package');
const paths = envPaths(pkg.name, { suffix: '' });

module.exports = {
    // livelook stuff
    username: os.userInfo().username,
    password: '',
    server: 'server.slsknet.org',
    port: 2242,
    waitPort: 2234,
    sharedFolder: paths.data + '/shared',
    description: pkg.homepage,
    autojoin: [ 'ghostgrab' ],
    maxPeers: 250,
    uploadSlots: 2,
    uploadThrottle: 56 * 1024,

    // ghostgrab stuff
    downloadFolder: paths.data + '/shared',
    api: {
        discogs: {
            key: 'OHxsxqpPzSAjWZOtDsoz',
            secret: 'VrjheKjobiEJBuwbJwyEFrpVqpwLEAhS'
        }
    }
}
