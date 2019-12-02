var LogedUserPanel = require("../ui/loged-user-panel");
var CurrencyPanel = require("../ui/currency-panel");
var InputPanel = require("../ui/input-panel");
var WalletsPanel = require("../ui/wallets-panel");

const walletsPath = "../projects/bigdata-project2/wallets/";

var LogInUser = function(){
    LogedUserPanel.LogUser();
    CurrencyPanel.Reset();
}

var CurrencySelected = function(currency){
    LogedUserPanel.CurrencySelected(currency);
    WalletsPanel.CurrencySelected(currency);
}

InputPanel.SetWalletPath(walletsPath);
InputPanel.SetDomElements(document.getElementById("form-panel"));
InputPanel.SetInputListener(LogInUser);

CurrencyPanel.SetCurrencySelectedListener(CurrencySelected);
CurrencyPanel.SetDomElements(document.getElementById("currency-list"));

WalletsPanel.SetDomElements(document.getElementById('wallets-list'));

LogedUserPanel.SetDomElements(document.getElementById('user-info-panel'));
