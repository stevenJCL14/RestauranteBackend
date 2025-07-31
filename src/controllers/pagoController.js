// Importa el objeto mercadopago que ya está configurado
const mercadopago = require('../config/mercadoPago');

const crearPago = async (req, res) => {
    try {
        // Obtenemos los datos del pedido directamente del cuerpo de la solicitud
        const { pedidoId, monto, medioPago } = req.body;

        // Validamos que los datos necesarios existan
        if (!pedidoId || !monto) {
            return res.status(400).json({ error: 'El ID del pedido y el monto son obligatorios.' });
        }

        // Paso 1: Crear la preferencia de pago en la API de Mercado Pago
        // Usamos la sintaxis moderna del SDK.
        const preference = await mercadopago.preferences.create({
            items: [
                {
                    title: `Pedido #${pedidoId}`,
                    quantity: 1,
                    unit_price: parseFloat(monto),
                    currency_id: 'PEN', // Asegúrate de que esto sea correcto para Perú
                },
            ],
            metadata: {
                pedidoId,
                medioPago,
            },
            back_urls: {
                success: 'https://tu-dominio-frontend.railway.app/cliente.html', // <--- REEMPLAZA ESTA URL
                failure: 'https://tu-dominio-frontend.railway.app/carrito.html', // <--- REEMPLAZA ESTA URL
                pending: 'https://tu-dominio-frontend.railway.app/cliente.html', // <--- REEMPLAZA ESTA URL
            },
            auto_return: 'approved',
        });

        // Paso 2: Devolver la URL de la pasarela de pago al frontend
        res.json({
            id: preference.body.id,
            init_point: preference.body.init_point,
        });

    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        res.status(500).json({ error: 'Error al generar el pago' });
    }
};

module.exports = { crearPago };
