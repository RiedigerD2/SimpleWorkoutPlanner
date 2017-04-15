var crypto = require('crypto');

function sign(msg, secret) {
    return crypto.createHmac('sha512', new Buffer(secret)).update(new Buffer(msg)).digest('base64');
}

function base64encode(value) {
    return new Buffer(value).toString('base64');
}

function base64decode(value) {
    return new Buffer(value, 'base64').toString();
}

module.exports.encode = function(payload, secret) {
    var algorithm = 'HS512'
    var header = {
        typ: 'JWT',
        alg: algorithm
    }

    var jwt = base64encode(JSON.stringify(header)) + '.' + base64encode(JSON.stringify(payload));
    return jwt + '.' + sign(jwt, secret);
}

module.exports.decode = function(token, secret) {
    var tokenArray = token.split('.');
    if (sign(tokenArray[0] + '.' + tokenArray[1], secret) === tokenArray[2]) {
        return JSON.parse(base64decode(tokenArray[1]));
    }
    return false;
}