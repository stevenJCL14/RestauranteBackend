const { Pedido, PedidoPlato, Plato } = require('../models');

const crearPedido = async (req, res) => {
  try {
    const clienteId = req.clienteId;
    console.log(req.clienteId);
    const { platos } = req.body;

    if (!platos || platos.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un plato' });
    }

    // Obtener precios actualizados de los platos
    const idsPlatos = platos.map(p => p.idPlato);
    const platosDB = await Plato.findAll({
      where: { id: idsPlatos }
    });

    // Calcular total
    let total = 0;
    const items = platos.map(p => {
      const plato = platosDB.find(pl => pl.id === p.idPlato);
      if (!plato) throw new Error(`Plato con ID ${p.idPlato} no encontrado`);
      const subtotal = plato.precio * p.cantidad;
      total += subtotal;

      return {
        platoId: p.idPlato,
        cantidad: p.cantidad
      };
    });

    // ✅ Crear pedido con el nombre correcto de la variable
    const pedido = await Pedido.create({ clienteId, total });

    // Registrar platos del pedido
    const itemsConPedido = items.map(item => ({
      ...item,
      pedidoId: pedido.id
    }));
    await PedidoPlato.bulkCreate(itemsConPedido);

    res.status(201).json({
      mensaje: 'Pedido registrado con éxito',
      pedidoId: pedido.id,
      total
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: error.message || 'Error interno' });
  }
};

// Historial de pedidos
const historialPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { clienteId: req.clienteId },
      
      include: [
        {
          model: PedidoPlato,
          as: 'pedidoPlatos',
          include: [
            {
              model: Plato,
              as: 'plato'
            }
          ]
        }
      ]
    });

    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial de pedidos' });
  }
};

module.exports = {
  crearPedido,
  historialPedidos
};
