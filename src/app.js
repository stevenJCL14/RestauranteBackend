const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Carga las variables de entorno una sola vez al inicio
dotenv.config();

const app = express();

// Configuración de CORS para permitir solicitudes desde cualquier origen
// Esto es ideal para el desarrollo.
app.use(cors());

// Middleware para parsear JSON (se usa una sola vez)
app.use(express.json());

// Importa y sincroniza la base de datos
const db = require('./models');
const sequelize = db.sequelize;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Rutas principales
const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/pedidos', pedidoRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menus', menuRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const platoRoutes = require('./routes/platoRoutes');
app.use('/api/platos', platoRoutes);

const clienteRoutes = require('./routes/clienteRoutes');
app.use('/api/clientes/auth', clienteRoutes);

const pagoRoutes = require('./routes/pagoRoutes');
app.use('/api/pagos', pagoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
