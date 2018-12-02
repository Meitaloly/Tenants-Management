const mongoose = require('mongoose');

const uri = `mongodb://127.0.0.1:27017/oxs`;

const connexion = () => {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, autoIndex: true });
        const db = mongoose.connection;
        db.once('open', () => {
            console.log("success")
        });
        db.on('error', err => {
            console.log(err);
        });
        return db;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = connexion;