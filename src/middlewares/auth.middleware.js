const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarTokenAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ error: 'Acceso solo para administradores' });
    }

    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { verificarTokenAdmin };
