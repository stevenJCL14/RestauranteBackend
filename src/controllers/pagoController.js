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



/*export const confirmarPagoWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const payment = await mercadopago.payment.findById(data.id);
      const pedidoId = payment.body.external_reference;

      if (payment.body.status === 'approved') {
        const pedido = await Pedido.findByPk(pedidoId);
        if (pedido) {
          pedido.estado = 'pagado';
          await pedido.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('Error en webhook:', err);
    res.sendStatus(500);
  }
};
module.exports = { confirmarPagoWebhook };*/