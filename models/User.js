module.exports = class User {
    constructor(email, name, family) {
        this.email = email;
        this.name = name;
        this.family = family;
    }

    save() {
        db.push(this);
    }

    static fetchAll() {
        return (db);
    }
};

/*
 this example stores the model in memory. Ideally these should be stored
 persistently in a database.
 */
let db = [];

