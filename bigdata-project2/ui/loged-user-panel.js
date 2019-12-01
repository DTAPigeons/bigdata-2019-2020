var UserManager = require("../managers/user-manager");

var userIdLable = document.getElementById("user-id");
var selectedCurrencyLable = document.getElementById("selected-currency-name");
var selectedCurrencyAmountLable = document.getElementById("selected-currency-amount");

var logedUser = {};
var selectedCurrency = "-------";
var selectedCurrencyAmount = "--------";

var LogUser = function(){
    logedUser = UserManager.GetCurrentUser();
    VisualiseData();
}


var SelectCurrency = function(currency){
    selectedCurrency = currency;
    var wallet = logedUser.GetCurrencyWallet(currency);
    if(wallet){
        selectedCurrencyAmount = wallet.amount;
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

module.exports = {
    LogUser: LogUser,
    SelectCurrency: SelectCurrency
};