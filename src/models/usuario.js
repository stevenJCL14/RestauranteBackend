const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  correo: {
    type: DataTypes.STRING,
    unique: true
  },
  contraseña: DataTypes.STRING,
  tipo: {
    type: DataTypes.ENUM('admin', 'cliente'),
    defaultValue: 'cliente'
  }
});

module.exports = Usuario;
