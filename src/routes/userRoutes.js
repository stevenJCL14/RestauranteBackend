const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

router.post('/register', register); // Registro (cliente o admin)
router.post('/login', login);       // Login

module.exports = router;
