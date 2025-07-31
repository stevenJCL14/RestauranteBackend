const express = require('express');
const router = express.Router();
const { crearPago } = require('../controllers/pagoController');

// Ruta para crear una preferencia de pago
router.post('/crear', crearPago);

module.exports = router;
