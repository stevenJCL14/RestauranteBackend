const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DiaMenu = sequelize.define('DiaMenu', {
  dia_semana: {
    type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
    allowNull: false
  }
});

module.exports = DiaMenu;
