var cryptoReference = require('crypto');

var sha256 = {};

var BuildHash = function(algorith, str) {

    var hashInstance = cryptoReference.createHash(algorith);
    hashInstance.update(str);
    return hashInstance.digest('hex');
};
 
sha256.Create = function(str) {
    return BuildHash("sha256", str);
};

module.exports = {
    sha256 : sha256
};