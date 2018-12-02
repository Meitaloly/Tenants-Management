const TenantDB = require("./../models/Tenant");

class Tenant {
    async add(req, res) {
        try {
            const tenant = new TenantDB(req.body);
            const savedTenant = await tenant.save();
            res.status(200).json({ success: true, data: savedTenant });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ success: false, message: e });
        }
    }

    async getTenants(req, res) {
        try {
            const tenants = await TenantDB.find({});
            res.status(200).json({ success: true, data: tenants });
        }
        catch (e) {
            res.status(400).json({ success: false, message: e });
        }
    }

    async deleteTenantById(req, res) {
        const { tenantId } = req.body;
        console.log("tenantId", tenantId);
        try {
            const answer = await TenantDB.deleteOne({ '_id': tenantId });
            res.status(200).json({ success: true });
        }
        catch (e) {
            res.status(400).json({ success: false, message: e });
        }
    }


    async updateTenant(req, res) {
        const { TenantToUpdate } = req.body;
        console.log("TenantToUpdate", TenantToUpdate);
        try {
            await TenantDB.updateOne({'_id':TenantToUpdate._id}, TenantToUpdate);
            res.status(200).json({ success: true });
        }
        catch (e) {
            res.status(400).json({ success: false, message: e });
        }
    }
}

module.exports = new Tenant();