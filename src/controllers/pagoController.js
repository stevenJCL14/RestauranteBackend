// Importa directamente la librería de Mercado Pago
const mercadopago = require('mercadopago');

// Configura las credenciales de Mercado Pago.
// Esto es más seguro que importarlo de otro archivo, en caso de errores de ruta.
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const crearPago = async (req, res) => {
    try {
        const { pedidoId, monto } = req.body;

        if (!pedidoId || !monto) {
            return res.status(400).json({ error: 'El ID del pedido y el monto son obligatorios.' });
        }

        const preference = {
            items: [
                {
                    title: `Pedido #${pedidoId}`,
                    quantity: 1,
                    unit_price: parseFloat(monto),
                    currency_id: 'PEN',
                },
            ],
            external_reference: pedidoId.toString(),
            back_urls: {
                success: 'https://tu-dominio-frontend.railway.app/cliente.html', // <--- REEMPLAZA ESTA URL
                failure: 'https://tu-dominio-frontend.railway.app/carrito.html', // <--- REEMPLAZA ESTA URL
                pending: 'https://tu-dominio-frontend.railway.app/cliente.html', // <--- REEMPLAZA ESTA URL
            },
            auto_return: 'approved',
        };

        const result = await mercadopago.preferences.create(preference);
        
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
