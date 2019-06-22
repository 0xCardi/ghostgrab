// encode and decode album name strings for saving as filenames

module.exports.encode = (artist, album) => {
    let encoded = Buffer.from((artist + ' - ' + album).toLowerCase());
    encoded = encoded.toString('base64');
    return encoded;
};

module.exports.decode = encoded => {
};
