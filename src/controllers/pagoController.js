// Importa el objeto mercadopago que ya está configurado
const mercadopago = require('../config/mercadoPago');
// Importa todos los modelos de la base de datos
const db = require('../models');

// Extrae los modelos específicos que necesitamos
const { Pedido, PedidoPlato, Plato } = db;

const crearPago = async (req, res) => {
    try {
        const { pedidoId } = req.body;

        // Validar que el pedidoId existe
        if (!pedidoId) {
            return res.status(400).json({ error: 'El ID del pedido es obligatorio.' });
        }

        // Paso 1: Buscar el pedido en la base de datos con sus platos asociados
        // Incluimos los platos para obtener la información necesaria
        const pedido = await Pedido.findByPk(pedidoId, {
            include: [{
                model: PedidoPlato,
                as: 'PedidoPlatos', // Asegúrate de que 'PedidoPlatos' sea el alias correcto para la asociación
                include: [{
                    model: Plato,
                    as: 'Plato' // Asegúrate de que 'Plato' sea el alias correcto para la asociación
                }]
            }],
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }

        // Paso 2: Mapear los platos del pedido a un formato que Mercado Pago entienda
        const items = pedido.PedidoPlatos.map(item => ({
            title: item.Plato.nombre,
            description: item.Plato.descripcion,
            quantity: item.cantidad,
            unit_price: parseFloat(item.Plato.precio),
            currency_id: 'PEN', // Moneda de Perú. Cámbiala si es necesario.
        }));

        // Paso 3: Crear la preferencia de pago en la API de Mercado Pago
        const preference = {
            items: items,
            external_reference: pedidoId.toString(),
            back_urls: {
                success: 'https://tu-dominio-frontend.com/pago-exitoso', // <--- REEMPLAZA ESTA URL
                failure: 'https://tu-dominio-frontend.com/pago-fallido', // <--- REEMPLAZA ESTA URL
                pending: 'https://tu-dominio-frontend.com/pago-pendiente', // <--- REEMPLAZA ESTA URL
            },
            auto_return: 'approved',
        };

        const result = await mercadopago.preferences.create(preference);
        
        // Paso 4: Devolver la URL de la pasarela de pago al frontend
        res.json({
            id: result.body.id,
            init_point: result.body.init_point,
        });

    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        res.status(500).json({ error: 'Error al generar el pago' });
    }
};

module.exports = { crearPago };
