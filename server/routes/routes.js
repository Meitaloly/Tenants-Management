const express = require("express");
const router = express();
const checkToken = require('./../helpers/checkTokenMiddleware');

const User = require('./../controllers/user.ctrl');
router.post("/user/login", User.login);
router.post("/user", User.add);
router.get("/user", User.getUser);


const Tenant = require('./../controllers/tenant.ctrl');
router.post("/tanent/updateTenant",checkToken,Tenant.updateTenant);
router.post("/tenant", checkToken, Tenant.add);
router.get("/tenant",checkToken, Tenant.getTenants);
router.delete("/tenant",checkToken,Tenant.deleteTenantById);

module.exports = router;