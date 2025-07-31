// pagoController.js

const mercadopago = require('../config/mercadoPago');
const { Pedido, PedidoPlato, Plato } = require('../models'); // Importar los modelos necesarios

const crearPago = async (req, res) => {
    try {
        const { pedidoId, monto } = req.body;

        // Validar que el pedidoId y el monto existen
        if (!pedidoId || !monto) {
            return res.status(400).json({ error: 'Faltan datos del pedido (pedidoId o monto).' });
        }

        // Paso 1: Buscar el pedido en la base de datos para obtener los detalles
        const pedido = await Pedido.findByPk(pedidoId, {
            include: [{ model: PedidoPlato, include: [Plato] }],
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }

        // Paso 2: Mapear los platos del pedido a un formato que Mercado Pago entienda
        const items = pedido.PedidoPlatos.map(item => ({
            title: item.Plato.nombre,
            description: item.Plato.descripcion, // La descripción es opcional
            quantity: item.cantidad,
            unit_price: parseFloat(item.Plato.precio),
            currency_id: 'PEN', // Asegúrate de que esto sea correcto para tu país (PEN para Perú)
        }));

        // Paso 3: Crear la preferencia de pago en la API de Mercado Pago
        const preference = {
            items: items,
            external_reference: pedidoId.toString(),
            back_urls: {
                success: 'https://tu-dominio-frontend.railway.app/cliente.html', // URL donde el cliente es redirigido después de un pago exitoso
                failure: 'https://tu-dominio-frontend.railway.app/carrito.html', // URL en caso de que el pago falle
                pending: 'https://tu-dominio-frontend.railway.app/cliente.html', // URL si el pago queda pendiente
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
