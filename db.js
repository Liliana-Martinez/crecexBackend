const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//Crear conexion con Mysql
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;