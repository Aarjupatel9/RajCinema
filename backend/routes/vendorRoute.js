const express = require('express');
const { getAllVendors, updateVendors , removeVendor, getVendor } = require('../controllers/vendorController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getAllVendors").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getAllVendors);
router.route("/getVendor").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getVendor);
router.route("/updateVendors").post(authenticateRoles([ROLES.ADMIN]), updateVendors);
router.route("/removeVendor").post(authenticateRoles([ROLES.ADMIN]), removeVendor);

module.exports = router;