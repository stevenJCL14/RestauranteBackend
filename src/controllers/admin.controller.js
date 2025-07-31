const { DiaMenu, Plato } = require('../models');

// ------------------ DIA MENU ------------------

// Crear día de menú
const crearDiaMenu = async (req, res) => {
  const { dia_semana } = req.body;
  const existe = await DiaMenu.findOne({ where: { dia_semana } });
  if (existe) return res.status(400).json({ error: 'Este día ya está registrado' });

  const nuevoDia = await DiaMenu.create({ dia_semana });
  res.json({ message: 'Día de menú creado', dia: nuevoDia });
};

// Listar todos los días
const listarDiasMenu = async (req, res) => {
  const dias = await DiaMenu.findAll();
  res.json(dias);
};

// Editar día
const editarDiaMenu = async (req, res) => {
  const { id } = req.params;
  const { dia_semana } = req.body;

  const dia = await DiaMenu.findByPk(id);
  if (!dia) return res.status(404).json({ error: 'Día no encontrado' });

  dia.dia_semana = dia_semana;
  await dia.save();
  res.json({ message: 'Día actualizado', dia });
};

// Eliminar día (y sus platos)
const eliminarDiaMenu = async (req, res) => {
  const { id } = req.params;

  const dia = await DiaMenu.findByPk(id);
  if (!dia) return res.status(404).json({ error: 'Día no encontrado' });

  await Plato.destroy({ where: { diaMenuId: id } });
  await dia.destroy();

  res.json({ message: 'Día y platos eliminados' });
};

// ------------------ PLATOS ------------------

// Crear plato
const crearPlato = async (req, res) => {
  const { titulo, descripcion, precio, imagen, diaMenuId } = req.body;

  const dia = await DiaMenu.findByPk(diaMenuId);
  if (!dia) return res.status(404).json({ error: 'Día no válido' });

  const nuevoPlato = await Plato.create({ titulo, descripcion, precio, imagen, diaMenuId });
  res.json({ message: 'Plato creado', plato: nuevoPlato });
};

// Listar platos por día
const listarPlatosPorDia = async (req, res) => {
  const { diaMenuId } = req.params;

  const platos = await Plato.findAll({ where: { diaMenuId } });
  res.json(platos);
};

// Editar plato
const editarPlato = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, precio, imagen } = req.body;

  const plato = await Plato.findByPk(id);
  if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });

  plato.titulo = titulo;
  plato.descripcion = descripcion;
  plato.precio = precio;
  plato.imagen = imagen;
  await plato.save();

  res.json({ message: 'Plato actualizado', plato });
};

// Eliminar plato
const eliminarPlato = async (req, res) => {
  const { id } = req.params;

  const plato = await Plato.findByPk(id);
  if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });

  await plato.destroy();
  res.json({ message: 'Plato eliminado' });
};

module.exports = {
  crearDiaMenu,
  listarDiasMenu,
  editarDiaMenu,
  eliminarDiaMenu,
  crearPlato,
  listarPlatosPorDia,
  editarPlato,
  eliminarPlato
};
