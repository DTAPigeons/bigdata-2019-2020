var fs = require('fs');
var cryptoHelper = require('../util/crypto-helper');
var CurrencyModel = require('../models/currency-wallet-model')
const walletsDir = "../projects/bigdata-project2/wallets/";

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
    var userPath = walletsDir + userID;
    CreateDir(userPath);
    currencyIndexes.forEach(currencyIndexe => {
        var currencyId = cryptoHelper.sha256.Create(userID + currencyList[currencyIndexe]);
        var currencyName = currencyList[currencyIndexe];
        var walletPath = userPath + "/" + currencyList[currencyIndexe] + ".json";
        var currencyWallet = new CurrencyModel(currencyName, currencyId, 1000, walletPath);

        SaveWalletToFile(currencyWallet);
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

var LoadWalletsForUser = function(userId){
    var wallets = [];
    var userDir = walletsDir + userId;
    var walletFiles = fs.readdirSync(userDir);
    walletFiles.forEach(function(file){
        var walletPath = userDir + "/" + file;
        var raw = fs.readFileSync(walletPath);
        var walletData = JSON.parse(raw);
        var wallet = new CurrencyModel(walletData.currency, walletData.id, walletData.amount, walletPath);
        wallets.push(wallet);
    })

    return wallets;
}

var SaveWalletToFile = function(wallet){
    var fileData = wallet.GetFileSaveData();
    fs.writeFileSync(fileData.path,JSON.stringify(fileData.object));
}

module.exports = {
    GetCurrencyList : GetCurrencyList,
    CreateWalletsForUser : CreateWalletsForUser,
    LoadWalletsForUser : LoadWalletsForUser,
    SaveWalletToFile: SaveWalletToFile
};