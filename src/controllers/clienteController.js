const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Cliente } = require('../models'); // Asegúrate de importar correctamente

const registerCliente = async (req, res) => {
  try {
    const { nombre, correo, telefono, clave } = req.body;

    // Verificar si ya existe un cliente con ese correo
    const existing = await Cliente.findOne({ where: { correo } });
    if (existing) return res.status(400).json({ error: 'Correo ya registrado' });

    const hashedClave = await bcrypt.hash(clave, 10);
    const nuevoCliente = await Cliente.create({
      nombre,
      correo,
      telefono,
      clave: hashedClave,
    });

    res.status(201).json({ message: 'Cliente registrado', cliente: nuevoCliente });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro', detalle: error.message });
  }
};

const loginCliente = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    const cliente = await Cliente.findOne({ where: { correo } });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const isMatch = await bcrypt.compare(clave, cliente.clave);
    if (!isMatch) return res.status(401).json({ error: 'Clave incorrecta' });

    const token = jwt.sign({ clienteId: cliente.id }, 'secreto', { expiresIn: '1d' });
    res.json({ message: 'Login exitoso', token, cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login', detalle: error.message });
  }
};

module.exports = { registerCliente, loginCliente };
