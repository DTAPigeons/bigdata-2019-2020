var fs = require('fs');
var cryptoHelper = require('../util/crypto-helper');
var currencyManager = require('../managers/currency-manager');
var TransactionModel = require('../models/transaction-model');

const transactionsLogPath  = "../projects/bigdata-project2/transactions/";

var AttempTransaction = function(fromWallet, toWallet, amount){
    if(!fromWallet || !toWallet){
        return "Invalid wallect!"
    }
     
    if(toWallet.amount<amount){
        return "Not enough cash!";
    }

    fromWallet.amount -= amount;
    toWallet.amount += amount;

    currencyManager.SaveWalletToFile(fromWallet);
    currencyManager.SaveWalletToFile(toWallet);

    var transactionId = cryptoHelper.sha256.Create(fromWallet.id, toWallet.id, amount);
    var transaction = new TransactionModel(transactionId, fromWallet.id, toWallet.id, amount);
    SaveTransactionData(transaction);

    return "Success! Transaction Id: " + transactionId;
}

var SaveTransactionData = function(transaction){
    var path = transactionsLogPath + transaction.id + ".json";
    fs.writeFileSync(path,JSON.stringify(transaction));
}

module.exports = {
    AttempTransaction: AttempTransaction
};