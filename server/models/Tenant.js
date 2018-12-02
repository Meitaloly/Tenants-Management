const mongoose = require('mongoose');

let TenantSchema = new mongoose.Schema(
    {
        name: {type: String },
        phone: {type: String },
        address: {type: String },
        financial_debt: {type: Number, default: 0 }
    }
);

module.exports = mongoose.model('Tenant', TenantSchema)