const { Model, DataTypes } = require('sequelize');

class PedidoPlato extends Model {}

module.exports = (sequelize) => {
  PedidoPlato.init(
    {
      pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      platoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'platos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'PedidoPlato',
      tableName: 'pedido_plato',
      timestamps: false,
    }
  );

  return PedidoPlato;
};
