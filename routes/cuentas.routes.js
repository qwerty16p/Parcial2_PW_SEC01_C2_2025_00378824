const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentas.controller');

router.get('/', cuentasController.getAllCuentas); 

module.exports = router;