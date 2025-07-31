const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', menuController.getAllMenus);
router.get('/:diaSemana', menuController.getMenuByDia);
router.post('/', authenticate, isAdmin, menuController.createMenu);
router.put('/:id', authenticate, isAdmin, menuController.updateMenu);
router.delete('/:id', authenticate, isAdmin, menuController.deleteMenu);

module.exports = router;
