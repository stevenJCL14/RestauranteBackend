const { MercadoPagoConfig } = require('mercadopago');

const mercadopago = new MercadoPagoConfig({
  accessToken: "APP_USR-3844797792094949-072716-9e9311b47d77ca731ff4b0303fd4b3d1-2555820397",
  options: { timeout: 5000 },
});

module.exports = mercadopago;
