class Guitar {
    constructor(id, name, price, contents, discount, views, created, updated, isDeleted) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.contents = contents;
        this.discount = discount;
        this.views = views;
        this.created = created;
        this.updated = updated;
        this.isDeleted = isDeleted;
    }
}

module.exports = Guitar;