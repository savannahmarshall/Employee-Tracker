const express = require('express');
const departmentRoutes = require('./api/departmentRoutes');
const roleRoutes = require('./api/roleRoutes');
const employeeRoutes = require('./api/employeeRoutes');
const router = express.Router();

router.use('/departments', departmentRoutes);
router.use('/roles', roleRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;