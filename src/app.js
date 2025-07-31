const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

// Importa la instancia de sequelize
const db = require('./models');
const sequelize = db.sequelize; // Asegúrate de obtenerla así

// Sincroniza los modelos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });



  
// ...otros imports

// Middleware para JSON
app.use(express.json());

// Rutas principales
const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/pedidos', pedidoRoutes);
// Rutas
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
// etc...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
