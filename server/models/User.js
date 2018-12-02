const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: { type: String ,unique: true },
    password: { type: String },
});

/**
* @source https://stackoverflow.com/questions/14588032/mongoose-password-hashing
*/
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
        if (err) return cb(err);
        else if (!success) return cb(new Error('The passwords do not match'));
        return cb(null, success); // true
    });
};


module.exports = mongoose.model('User', UserSchema)