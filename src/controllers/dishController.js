const { Dish } = require('../models');

// Crear plato
exports.createDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los platos
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener plato por ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar plato
exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Plato no encontrado' });

    await dish.update(req.body);
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar plato
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByPk(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Plato no encontrado' });

    await dish.destroy();
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
