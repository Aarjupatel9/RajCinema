const express = require('express');
const { getAllCanteens, getCanteen, updateCanteens, removeCanteen, getAllCanteenProducts } = require('../controllers/canteenController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/getAllCanteens").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getAllCanteens);
router.route("/getCanteen").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER, ROLES.NORMAL_USER]), getCanteen);
router.route("/updateCanteens").post(authenticateRoles([ROLES.ADMIN]), updateCanteens);
router.route("/removeCanteen").post(authenticateRoles([ROLES.ADMIN]), removeCanteen);

router.route("/getAllCanteenProducts").post(authenticateRoles([ROLES.ADMIN, ROLES.CANTEEN_USER]), getAllCanteenProducts);


module.exports = router;