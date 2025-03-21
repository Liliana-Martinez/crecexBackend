require('dotenv').config();
console.log('Puerto configurado:', process.env.PORT);
console.log("Base de datos:", process.env.DB_NAME);
const express = require('express');
const cors = require('cors');
const mysql = require('mysql')

const app = express();

app.use(cors());
app.use(express.json());

//Conexión a la bd usando las variables de .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if(err) {
        console.error('Error conectando la BD:', err)
        return;
    }
    console.log('Conectado a la base de datos');
});

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

