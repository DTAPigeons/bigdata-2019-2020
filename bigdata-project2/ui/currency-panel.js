var CurrencyManager = require('../managers/currency-manager');


var currencyListPanel;
var currencySelectedListener;

var Reset = function(){
    var currencyList = CurrencyManager.GetCurrencyList();
    currencyList.forEach(function(currency){
        var currencyItem = document.createElement('li');
        currencyItem.innerText = currency;
        var onclickEvent = {
            selectedCurrency : currency,
            onClick: function(){ currencySelectedListener(this.selectedCurrency);}
        }
        currencyItem.addEventListener("click", function(){ onclickEvent.onClick()});
        currencyListPanel.appendChild(currencyItem);
    })
}


var SetDomElements = function(doc){
    currencyListPanel = doc;
}

var SetCurrencySelectedListener = function(lister){
    currencySelectedListener = lister;
}

module.exports = {
    Reset: Reset,
    SetCurrencySelectedListener: SetCurrencySelectedListener,
    SetDomElements: SetDomElements
}