var CurrencyManager = require('../managers/currency-manager');
var LogedUserPanel = require("../ui/loged-user-panel");
var WalletsPanel = require("../ui/wallets-panel");

var currencyListPanel = document.getElementById("currency-list");

var Reset = function(){
    var currencyList = CurrencyManager.GetCurrencyList();
    currencyList.forEach(function(currency){
        var currencyItem = document.createElement('li');
        currencyItem.innerText = currency;
        var onclickEvent = {
            selectedCurrency : currency,
            onClick: function(){ SelectCurrency(this.selectedCurrency);}
        }
        currencyItem.addEventListener("click", function(){ onclickEvent.onClick()});
        currencyListPanel.appendChild(currencyItem);
    })
}

var SelectCurrency = function(currency){
    LogedUserPanel.SelectCurrency(currency);
    WalletsPanel.CurrencySelected(currency);
}

module.exports = {
    Reset: Reset
}