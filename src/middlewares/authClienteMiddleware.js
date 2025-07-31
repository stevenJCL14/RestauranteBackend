// src/middlewares/authClienteMiddleware.js
const jwt = require('jsonwebtoken');

const authCliente = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secreto');

    // Usa la propiedad correcta según cómo generaste el token
    if (!decoded.clienteId) {
      return res.status(403).json({ error: 'Token inválido para cliente' });
    }

    req.clienteId = decoded.clienteId; // o .clienteId si tu token lo tiene así
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido', detalle: error.message });
  }
};

module.exports = authCliente;
