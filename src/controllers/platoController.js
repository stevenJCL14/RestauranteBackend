const { Plato } = require('../models');

// Obtener todos los platos
exports.getPlatos = async (req, res) => {
  try {
    const platos = await Plato.findAll();
    res.json(platos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos' });
  }
};

// Obtener un plato por ID
exports.getPlatoById = async (req, res) => {
  try {
    const plato = await Plato.findByPk(req.params.id);
    if (!plato) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    res.json(plato);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el plato' });
  }
};

// Crear un nuevo plato
exports.createPlato = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagenUrl } = req.body;
    const nuevoPlato = await Plato.create({ nombre, descripcion, precio, imagenUrl });
    res.status(201).json(nuevoPlato);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el plato' });
  }
};

// Actualizar un plato
exports.updatePlato = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await Plato.findByPk(id);
    if (!plato) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    const { nombre, descripcion, precio, imagenUrl } = req.body;
    await plato.update({ nombre, descripcion, precio, imagenUrl });
    res.json(plato);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el plato' });
  }
};

// Eliminar un plato
exports.deletePlato = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await Plato.findByPk(id);
    if (!plato) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    await plato.destroy();
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el plato' });
  }
};