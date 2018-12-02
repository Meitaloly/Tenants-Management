const jwt = require("jsonwebtoken");
const salt = "slfk$#@GDS^#135";

const create = function (user) {
    return jwt.sign(user, salt, { expiresIn: '1hour' });
}

const verifyToken = function (token) {
    return new Promise((resolve, reject) => {
        try {
            console.log("token:",token)
            resolve(jwt.verify(token, salt));
        }
        catch (e) {
            reject();
        }
    });
}

module.exports = {create, verifyToken};