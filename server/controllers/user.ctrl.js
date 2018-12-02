const UserDB = require("./../models/User");
const LogsDB = require("./../models/Logs");
const jwt = require('./../helpers/jwt');

class User {
    async add(req, res) {
        try {
            const user = new UserDB(req.body);
            const savedUser = await user.save();
            res.status(200).json({ success: true, data: savedUser });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ success: false, message: e });
        }
    }

    async getUser(req, res) {
        try {
            const users = await UserDB.find({});
            res.status(200).json({ success: true, data: users });
        }
        catch (e) {
            res.status(400).json({ success: false, message: e });
        }
    }

    async login(req, res) {
        try {
            const { userName, password } = req.body;
            const user = await UserDB.findOne({ 'userName': userName });
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                }
                else {
                    const log = new LogsDB({ "event": "SIGN_IN", "user": user._id });
                    const newLog = log.save();
                    const token = jwt.create({ userName });
                    res.status(200).json({ success: isMatch, data: user, token });
                }
            });
        }
        catch (e) {
            console.log("user is not exists!");
            res.status(400).json({ success: false, message: e });
        }
    }
}

module.exports = new User();