var fs = require('fs');
var cryptoHelper = require('../util/crypto-helper');

var currencyList = [];
currencyList.push('BGN');
currencyList.push('USD');
currencyList.push('EUR');
currencyList.push('GBP');
currencyList.push('VES');
currencyList.push('ZWD');

var GetCurrencyList = function(){
  
    return currencyList;
}

var CreateWalletsForUser = function(userData, currencyIndexes){
    var userID = cryptoHelper.sha256.Create(userData.email+userData.password); 
    var userPath = "../projects/bigdata-project2/wallets/" + userID;
    CreateDir(userPath);
    currencyIndexes.forEach(currencyIndexe => {
        var currencyWallet = {
            currency: currencyList[currencyIndexe],
            id: cryptoHelper.sha256.Create(userID + currencyList[currencyIndexe]),
            amount: 1000
        }
        var walletPath = userPath + "/" + currencyList[currencyIndexe] + ".json";

        fs.writeFileSync(walletPath,JSON.stringify(currencyWallet));
    });
}

var CreateDir = function(path){
    if(fs.existsSync(path)){
        window.alert("wallet exists");
        return;
    }
    
    fs.mkdir( path, { recursive: true }, (err) => {
        if (err) throw err;
      })
}

module.exports = {
    GetCurrencyList : GetCurrencyList,
    CreateWalletsForUser : CreateWalletsForUser
};