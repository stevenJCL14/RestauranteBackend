const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.User;

const AuthController = {
  register: async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ error: 'Usuario ya existe' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword, role });
      res.status(201).json({ message: 'Usuario registrado', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secreto', {
        expiresIn: '1d'
      });

      res.json({ message: 'Login exitoso', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};

module.exports = AuthController;
