const { Model, DataTypes } = require('sequelize');

class Menu extends Model {}

module.exports = (sequelize) => {
  Menu.init(
    {
      diaSemana: {
        type: DataTypes.ENUM(
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
          'Domingo'
        ),
        allowNull: false,
        unique: true, // Solo un menú por día
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus',
    }
  );

  return Menu;
};
