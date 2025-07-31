const express = require('express');
const router = express.Router();
const authCliente = require('../middlewares/authClienteMiddleware');
const pedidoController = require('../controllers/pedidoController');

router.post('/', authCliente, pedidoController.crearPedido);
router.get('/historial', authCliente, pedidoController.historialPedidos);

module.exports = router;
