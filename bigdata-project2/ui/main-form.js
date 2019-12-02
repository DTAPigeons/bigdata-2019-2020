var LogedUserPanel = require("../ui/loged-user-panel");
var CurrencyPanel = require("../ui/currency-panel");
var InputPanel = require("../ui/input-panel");
var WalletsPanel = require("../ui/wallets-panel");
var TransactionManager = require("../managers/transaction-manager");

const walletsPath = "../projects/bigdata-project2/wallets/";

var LogInUser = function(){
    LogedUserPanel.LogUser();
    CurrencyPanel.Reset();
}

var CurrencySelected = function(currency){
    Refresh();
    LogedUserPanel.CurrencySelected(currency);
    WalletsPanel.CurrencySelected(currency);
}

var EnableTransaction = function(){
    var toWallet = WalletsPanel.GetSelectedWallet();
    InputPanel.EnableTransaction(ExecuteTransaction, toWallet.id);
}

var ExecuteTransaction = function(amount){
    var transactionAmount = parseInt(amount);
    var resultMessage;
    if(isNaN(transactionAmount)){
        resultMessage = "Invalid amount";
    }
    else{
        var fromWallet = LogedUserPanel.GetSelectedWallet();
        var toWallet = WalletsPanel.GetSelectedWallet();
        resultMessage = TransactionManager.AttempTransaction(fromWallet,toWallet, transactionAmount);
    }
    Refresh();

    window.alert(resultMessage);

}

var Refresh = function(){
    LogedUserPanel.Refresh();
    InputPanel.Refresh();
    WalletsPanel.Refresh();
}


InputPanel.SetWalletPath(walletsPath);
InputPanel.SetDomElements(document.getElementById("form-panel"));
InputPanel.SetInputListener(LogInUser);

CurrencyPanel.SetCurrencySelectedListener(CurrencySelected);
CurrencyPanel.SetDomElements(document.getElementById("currency-list"));

WalletsPanel.SetDomElements(document.getElementById('wallets-list'));
WalletsPanel.SetWallerSelectedListener(EnableTransaction);

LogedUserPanel.SetDomElements(document.getElementById('user-info-panel'));
