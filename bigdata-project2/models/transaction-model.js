var TransactionModel = function(id,fromId, toId, amount){
    this.id = id,
    this.fromId = fromId,
    this.toId = toId,
    this.amount = amount
}

module.exports = TransactionModel;