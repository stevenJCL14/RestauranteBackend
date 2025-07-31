const express = require('express');
const router = express.Router();
const platoController = require('../controllers/platoController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', platoController.getPlatos);
router.post('/', authenticate, isAdmin, platoController.createPlato);
router.put('/:id', authenticate, isAdmin, platoController.updatePlato);
router.delete('/:id', authenticate, isAdmin, platoController.deletePlato);

module.exports = router;
