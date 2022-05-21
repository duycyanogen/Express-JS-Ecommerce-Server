class User {
    constructor(id, name, email, phone, address, password, created, updated, isDeleted, idRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.created = created;
        this.updated = updated;
        this.isDeleted = isDeleted;
        this.idRole = idRole;
    }
}

module.exports = User;