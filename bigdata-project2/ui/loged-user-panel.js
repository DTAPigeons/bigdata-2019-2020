var UserManager = require("../managers/user-manager");

var userIdLable;
var selectedCurrencyLable;
var selectedCurrencyAmountLable;

var logedUser = {};
var selectedCurrency = "-------";
var selectedCurrencyAmount = "--------";
var selectedWallet;

var LogUser = function(){
    logedUser = UserManager.GetCurrentUser();
    VisualiseData();
}


var CurrencySelected = function(currency){
    selectedCurrency = currency;
    var wallet = logedUser.GetCurrencyWallet(currency);
    if(wallet){
        selectedCurrencyAmount = wallet.amount;
        selectedWallet = wallet;
    }
    else{
        selectedCurrencyAmount = "--------";
    }
    VisualiseData();
}

var VisualiseData = function(){
    userIdLable.innerText = logedUser.id;
    selectedCurrencyLable.innerText = selectedCurrency;
    selectedCurrencyAmountLable.innerText = selectedCurrencyAmount;
}

var SetDomElements = function(doc){
    userIdLable = doc.querySelector("#user-id");
    selectedCurrencyLable = doc.querySelector("#selected-currency-name");
    selectedCurrencyAmountLable = doc.querySelector("#selected-currency-amount");
}

var GetSelectedWallet = function(){
    return selectedWallet;
}

var Refresh = function(){
    CurrencySelected(selectedCurrency);
}

module.exports = {
    LogUser: LogUser,
    CurrencySelected: CurrencySelected,
    SetDomElements: SetDomElements,
    GetSelectedWallet: GetSelectedWallet,
    Refresh: Refresh
};