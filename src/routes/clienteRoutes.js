const express = require('express');
const router = express.Router();
const { registerCliente, loginCliente } = require('../controllers/clienteController');

router.post('/register', registerCliente);
router.post('/login', loginCliente);

module.exports = router;
