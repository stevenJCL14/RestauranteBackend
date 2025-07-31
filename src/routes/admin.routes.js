const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verificarTokenAdmin } = require('../middlewares/auth.middleware');

// DIA MENU
router.post('/dia-menu', verificarTokenAdmin, adminController.crearDiaMenu);
router.get('/dia-menu', verificarTokenAdmin, adminController.listarDiasMenu);
router.put('/dia-menu/:id', verificarTokenAdmin, adminController.editarDiaMenu);
router.delete('/dia-menu/:id', verificarTokenAdmin, adminController.eliminarDiaMenu);

// PLATOS
router.post('/plato', verificarTokenAdmin, adminController.crearPlato);
router.get('/plato/dia/:diaMenuId', verificarTokenAdmin, adminController.listarPlatosPorDia);
router.put('/plato/:id', verificarTokenAdmin, adminController.editarPlato);
router.delete('/plato/:id', verificarTokenAdmin, adminController.eliminarPlato);

module.exports = router;
