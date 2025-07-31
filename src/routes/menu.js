const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// CRUD menús
router.post('/', menuController.createMenu);
router.get('/', menuController.getAllMenus);
router.get('/:day', menuController.getMenuByDay);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
