const { Menu, Plato } = require('../models');

// Crear menú por día de la semana
exports.createMenu = async (req, res) => {
  try {
    const { diaSemana, descripcion, platoIds } = req.body;

    if (!diaSemana) {
      return res.status(400).json({ error: 'El día de la semana es obligatorio' });
    }

    const existingMenu = await Menu.findOne({ where: { diaSemana } });
    if (existingMenu) {
      return res.status(400).json({ error: 'Ya existe un menú para ese día' });
    }

    const menu = await Menu.create({ diaSemana, descripcion });

    if (platoIds && platoIds.length > 0) {
      await menu.setPlatos(platoIds);
    }

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los menús con sus platos
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: {
        model: Plato,
        as: 'platos',
      },
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener menú por día de la semana
exports.getMenuByDia = async (req, res) => {
  try {
    const { diaSemana } = req.params;

    const menu = await Menu.findOne({
      where: { diaSemana },
      include: {
        model: Plato,
        as: 'platos',
      },
    });

    if (!menu) {
      return res.status(404).json({ message: 'Menú no encontrado para ese día' });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar menú
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { diaSemana, descripcion, platoIds } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) return res.status(404).json({ message: 'Menú no encontrado' });

    await menu.update({ diaSemana, descripcion });

    if (platoIds) await menu.setPlatos(platoIds);

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar menú
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menú no encontrado' });

    await menu.destroy();
    res.json({ message: 'Menú eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
