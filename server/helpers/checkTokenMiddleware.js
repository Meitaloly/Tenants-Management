const jwt = require('./jwt');

async function checkToken(req, res, next) {
    try {
        const token = req.headers.apptoken;
        const decoded = await jwt.verifyToken(token);
        next();
    }
    catch (e) {
        console.log("error",e);
        next(e);
        res.status(401).json({ success: false, message: e });
    }
}

module.exports = checkToken;