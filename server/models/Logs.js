const mongoose = require('mongoose');

let LogsSchema = new mongoose.Schema(
    {
        event: { type: String },
        time: {
            type: String, default: new Date().toLocaleString()
        },
        user: { type: mongoose.Schema.ObjectId, ref: "User" }
    }
);

module.exports = mongoose.model('Logs', LogsSchema)