const mongoose = require('mongoose');

let TenantSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        financial_debt: Number,
        address: String
    }
);

TenantSchema.methods.getAllTenants = function () {
    return Tenant.find({});
}
TenantSchema.methods.getTenantsWithDebts = function () {
    return Tenant.find({ 'financial_debt':{$eq : 0}});
}
TenantSchema.methods.getTenantsWithNoDebts = function () {
    return Tenant.find({ 'financial_debt':{$gt : 0}});
}
TenantSchema.methods.getTenantsByName = function (tenantName) {
    return Tenant.find({ 'name':{$regex : ".*"+tenantName+".*"}});
}
module.exports = mongoose.model('Tenant', TenantSchema)