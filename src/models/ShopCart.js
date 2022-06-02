class ShopCart {
    constructor(id, userID, idGuitar, quantity, amount, created,  updated, isOrdered) {
        this.id = id;
        this.userID = userID;
        this.idGuitar = idGuitar;
        this.quantity = quantity;
        this.amount = amount;
        this.created = created;
        this.updated = updated;
        this.isOrdered = isOrdered;
    }
}

module.exports = ShopCart;