const express = require('express');
const { transferProducts } = require('../controllers/adminController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

router.route("/transferProducts")
    .post(authenticateRoles([ROLES.ADMIN]), transferProducts);


module.exports = router;