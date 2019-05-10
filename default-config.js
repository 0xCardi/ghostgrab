// default configuration for livelook and our module

const envPaths = require('env-paths');

const pkg = require('./package');
const paths = envPaths(pkg.name, { suffix: '' });

module.exports = {
    server: 'server.slsknet.org',
    port: 2242,
    waitPort: 2234,
    sharedFolder: paths.data + '/shared',
    downloadFolder: paths.data + '/shared',
    description: pkg.homepage,
    autojoin: [ 'ghostgrab' ],
    maxPeers: 250,
    uploadSlots: 2,
    uploadThrottle: 56 * 1024
}
