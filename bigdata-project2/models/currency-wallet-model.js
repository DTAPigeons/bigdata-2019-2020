var CurrencyModel = function(currency, id, amount, filePath){
    this.currency = currency,
    this.id = id,
    this.amount = amount,
    this.filePath = filePath
}

CurrencyModel.prototype.GetFileSaveData = function(){
    var saveObject = {
        currency : this.currency,
        id : this.id,
        amount : this.amount
    };
    var filePath = this.filePath;

    return {
        object: saveObject,
        path: filePath
    }
}

module.exports = CurrencyModel;