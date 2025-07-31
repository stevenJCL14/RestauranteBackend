const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {}

module.exports = (sequelize) => {
  Cliente.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clave: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
    }
  );

  return Cliente;
};
