const mercadopago = require('../config/mercadoPago');
const { Preference } = require('mercadopago'); // nuevo

const crearPago = async (req, res) => {
  try {
    const { pedidoId, monto, medioPago } = req.body;

    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            title: `Pedido #${pedidoId}`,
            quantity: 1,
            unit_price: parseFloat(monto),
            currency_id: 'PEN',
          },
        ],
        metadata: {
          pedidoId,
          medioPago,
        },
        back_urls: {
          success: 'https://tuweb.com/pago-exitoso',
          failure: 'https://tuweb.com/pago-fallido',
        },
        auto_return: 'approved',
      },
    });

    res.json({
      id: preference.id,
      init_point: preference.init_point,
    });

  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    res.status(500).json({ error: 'Error al generar el pago' });
  }
};

module.exports = { crearPago };
