require('dotenv').config();
console.log('Puerto configurado:', process.env.PORT);
console.log("Base de datos:", process.env.DB_NAME);
const express = require('express');
const cors = require('cors');
const db = require('./db')
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));
app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

