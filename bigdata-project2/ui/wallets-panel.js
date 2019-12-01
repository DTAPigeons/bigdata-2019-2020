var UserManager = require('../managers/user-manager');
var walletsListPanel = document.getElementById('wallets-list');


var CurrencySelected = function(currency){
    var users = UserManager.GetUserList();
    ClearWalletListPanel();
    users.forEach(function(user){
        var wallet = user.GetCurrencyWallet(currency);
        if(wallet){
            var walletItem = CreateWalletItem(wallet, user);
            walletsListPanel.appendChild(walletItem);
        }
    })
}

var ClearWalletListPanel = function(){
    while(walletsListPanel.firstChild){
        walletsListPanel.removeChild(walletsListPanel.firstChild);
    }
}

var CreateWalletItem = function(wallet, user){
    var walletItem = document.createElement('li');
    var walletId = document.createTextNode("Id: " + wallet.id);
    var walletAmount = document.createTextNode("Amount: " + wallet.amount);
    var newLine = document.createElement('br');
    walletItem.appendChild(walletId);
    walletItem.appendChild(newLine);
    walletItem.appendChild(walletAmount);
    var onclickEvet = {            
        userId: user.id,            
        currency: wallet.currency,
        onClick: function(){
            WalletSelected({
                userId: this.userId,
                currency: this.currency
            });
        }
    }
    walletItem.addEventListener("click", function(){onclickEvet.onClick()})
    return walletItem;
}


var WalletSelected = function(data){
    window.alert(data.userId+" "+data.currency);
}

module.exports = {
    CurrencySelected: CurrencySelected
}
