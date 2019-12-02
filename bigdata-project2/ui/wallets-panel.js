var UserManager = require('../managers/user-manager');
var walletsListPanel;
var selectedCurrency;
var selectedWallet;
var WalletSelectedListener;

var CurrencySelected = function(currency){
    selectedCurrency = currency;
    var users = UserManager.GetUserList();
    ClearWalletListPanel();
    users.forEach(function(user){
        var wallet = user.GetCurrencyWallet(currency);
        if(wallet){
            var walletItem = CreateWalletItem(wallet);
            walletsListPanel.appendChild(walletItem);
        }
    })
}

var ClearWalletListPanel = function(){
    while(walletsListPanel.firstChild){
        walletsListPanel.removeChild(walletsListPanel.firstChild);
    }
}

var CreateWalletItem = function(wallet){
    var walletItem = document.createElement('li');
    var walletId = document.createTextNode("Id: " + wallet.id);
    var walletAmount = document.createTextNode("Amount: " + wallet.amount);
    var newLine = document.createElement('br');
    walletItem.appendChild(walletId);
    walletItem.appendChild(newLine);
    walletItem.appendChild(walletAmount);
    walletItem.addEventListener("click", function(){WalletSelected(wallet)})
    walletItem.id = wallet.Id;
    return walletItem;
}


var WalletSelected = function(wallet){

    selectedWallet = wallet; 
    WalletSelectedListener();
}


var SetDomElements = function(doc){
    walletsListPanel = doc;
}

var GetSelectedWallet = function(){
    return selectedWallet;
}

var Refresh = function(){
    selectedWallet = undefined;
    CurrencySelected(selectedCurrency);
}

var SetWallerSelectedListener = function(listener){
    WalletSelectedListener = listener;
}

module.exports = {
    CurrencySelected: CurrencySelected,
    SetDomElements: SetDomElements,
    GetSelectedWallet: GetSelectedWallet,
    Refresh: Refresh,
    SetWallerSelectedListener: SetWallerSelectedListener
}
