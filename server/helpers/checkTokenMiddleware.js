const jwt = require('./jwt');

async function checkToken(req, res, next) {
    try {
        console.log("req=",req);
        const token = req.headers.apptoken;
        console.log("token in header: ",token);
        const decoded = await jwt.verifyToken(token);
        console.log("decoded", decoded);
        next();
    }
    catch (e) {
        console.log("error",e);
        next(e);
        res.status(401).json({ success: false, message: e });
    }
}

module.exports = checkToken;