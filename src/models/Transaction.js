class Transaction {
    constructor(id, userID, customerName, customerEmail, customerPhone, customerAddress, amount, message, created, updated,status,note,isCanceled) {
        this.id = id;
        this.userID = userID;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerAddress = customerAddress;
        this.amount = amount;
        this.message = message;
        this.created = created;
        this.updated = updated;
        this.status = status;
        this.note = note;
        this.isCanceled = isCanceled;
    }
}

module.exports = Transaction;