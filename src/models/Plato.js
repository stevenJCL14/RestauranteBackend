const { Model, DataTypes } = require('sequelize');

class Plato extends Model {}

module.exports = (sequelize) => {
  Plato.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      imagenUrl: {
      type: DataTypes.STRING,
      allowNull: true, // La URL de la imagen es opcional
    },
    },
    {
      sequelize,
      modelName: 'Plato',
      tableName: 'platos',
    }
  );

  return Plato;
};
