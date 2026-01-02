const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth.middleware');
const checkAccess = require('../middleware/role.guard');
const driverController = require('../controllers/driver.controller');

router.put('/location', requireLogin, checkAccess('driver','update'), driverController.updateLocation);

module.exports = router;
