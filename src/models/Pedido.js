// src/models/Pedido.js
const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static associate(models) {
    Pedido.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      as: 'cliente',
      onDelete: 'CASCADE',
    });

    Pedido.belongsToMany(models.Plato, {
      through: models.PedidoPlato,
      foreignKey: 'pedidoId',
      otherKey: 'platoId',
      as: 'platos',
    });
  }
}

module.exports = (sequelize) => {
  Pedido.init(
    {
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'pedidos',
    }
  );

  return Pedido;
};
