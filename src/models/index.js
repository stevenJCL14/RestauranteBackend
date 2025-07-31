const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// Importar modelos
const User = require('./User')(sequelize, DataTypes);
const Plato = require('./Plato')(sequelize, DataTypes);
const Menu = require('./Menu')(sequelize, DataTypes);
const Cliente = require('./Cliente')(sequelize, DataTypes);
const Pedido = require('./Pedido')(sequelize, DataTypes);
const PedidoPlato = require('./PedidoPlato')(sequelize, DataTypes);

// Asociaciones

// Cliente - Pedido (1:N)
Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Pedido - PedidoPlato (1:N)
Pedido.hasMany(PedidoPlato, { foreignKey: 'pedidoId', as: 'pedidoPlatos' });
PedidoPlato.belongsTo(Pedido, { foreignKey: 'pedidoId', as: 'pedido' });

// Plato - PedidoPlato (1:N)
Plato.hasMany(PedidoPlato, { foreignKey: 'platoId', as: 'pedidoPlatos' });
PedidoPlato.belongsTo(Plato, { foreignKey: 'platoId', as: 'plato' });

// Pedido - Plato (N:M) a través de PedidoPlato
Pedido.belongsToMany(Plato, {
  through: PedidoPlato,
  as: 'platos',
  foreignKey: 'pedidoId',
  otherKey: 'platoId',
});
Plato.belongsToMany(Pedido, {
  through: PedidoPlato,
  as: 'pedidos',
  foreignKey: 'platoId',
  otherKey: 'pedidoId',
});

// Menu - Plato (N:M) a través de MenuPlato
Menu.belongsToMany(Plato, {
  through: 'MenuPlato',
  as: 'platos',
  foreignKey: 'menuId',
  otherKey: 'platoId',
});
Plato.belongsToMany(Menu, {
  through: 'MenuPlato',
  as: 'menus',
  foreignKey: 'platoId',
  otherKey: 'menuId',
});

// Exportar todos los modelos y sequelize
module.exports = {
  sequelize,
  User,
  Plato,
  Menu,
  Cliente,
  Pedido,
  PedidoPlato,
};
