const express = require('express');
const { GetUser, GetAllUsers,  GetNewUsers, transferProducts } = require('../controllers/userController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { ROLES } = require('../utils/constants')
const router = express.Router();

// router.route("/getUser")
//     .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR, ROLES.STD_USER]), GetUser);

// router.route("/getUsers")
//     .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR, ROLES.STD_USER]), GetAllUsers);

// router.route("/getNewUsers")
//     .post(authenticateRoles([ROLES.HEAD, ROLES.SYSTEM_COORDINATOR]), GetNewUsers);





module.exports = router;