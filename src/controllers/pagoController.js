// Importa las clases necesarias del SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');

// Crea una instancia de la configuración del cliente.
// Esto es el equivalente moderno a mercadopago.configure()
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Crea una instancia de la clase Preference con el cliente configurado
const preference = new Preference(client);

const crearPago = async (req, res) => {
    try {
        const { pedidoId, monto } = req.body;

        if (!pedidoId || !monto) {
            return res.status(400).json({ error: 'El ID del pedido y el monto son obligatorios.' });
        }

        const preferenceBody = {
            items: [
                {
                    title: `Pedido #${pedidoId}`,
                    quantity: 1,
                    unit_price: parseFloat(monto),
                    currency_id: 'PEN', // Moneda de Perú
                },
            ],
            external_reference: pedidoId.toString(),
            back_urls: {
                success: 'https://stevenjcl.github.io/RestauranteFrontend/cliente.html', // <--- REVISA QUE ESTA URL SEA CORRECTA
                failure: 'https://stevenjcl.github.io/RestauranteFrontend/carrito.html',  // <--- REVISA QUE ESTA URL SEA CORRECTA
                pending: 'https://stevenjcl.github.io/RestauranteFrontend/cliente.html',  // <--- REVISA QUE ESTA URL SEA CORRECTA
            },
            auto_return: 'approved',
        };

        const result = await preference.create({ body: preferenceBody });
        
        res.json({
            id: result.id,
            init_point: result.init_point,
        });

    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        res.status(500).json({ error: 'Error al generar el pago' });
    }
};

module.exports = { crearPago };
