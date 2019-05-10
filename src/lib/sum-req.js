// provide an object of log-relevant http req info for bunyan

module.exports = req => ({
    headers: req.headers,
    ip: req.connection.remoteAddress,
    method: req.method,
    url: req.url
});
