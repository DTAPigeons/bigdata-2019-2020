var User= function(id, wallets){
    this.id = id;
    this.wallets = wallets;
} 

User.prototype.HasCurrencyWallet = function(currency){
    var wallet = this.GetCurrencyWallet(currency);
    if(wallet) return true;
    return false;
}

User.prototype.GetCurrencyWallet = function(currency){
    var wallet = this.wallets.find(wallet=> wallet.currency == currency);
    return wallet;
}

module.exports = User;