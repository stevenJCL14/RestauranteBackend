const { MercadoPagoConfig } = require('mercadopago');

const mercadopago = new MercadoPagoConfig({
  accessToken: "TEST-3844797792094949-072716-d537b5b4908063f2bcff0548361fda7b-2555820397",
  options: { timeout: 5000 },
});

module.exports = mercadopago;
