class Order {
    constructor(id, transactionID, idGuitar, quantity, amount, created, updated, status,idCanceled) {
       this.id=id;
       this.transactionID=transactionID;
       this.idGuitar=idGuitar;
       this.quantity=quantity;
       this.amount=amount;
       this.created=created;
       this.iupdated=updated;
       this.status=status;
       this.idCanceled=idCanceled;

    }
}

module.exports = Order;