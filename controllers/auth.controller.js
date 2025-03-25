const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Controlador para el login
exports.login = (req, res) => {
    const { user, password } = req.body;

    //Validacion de que los campos no esten vacios
    if (!user || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    //Buscar usuario en la base de datos
    const query = 'SELECT * FROM users WHERE user = ?';
    db.query(query, [user], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos');
            return res.status(500).json({ message: 'Error en el servidor' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }

        //verificar la contraseña
        const userRecord = results[0];
        bcrypt.compare(password, userRecord.password, (err, isMatch) => {
            if (err) {
                console.error('Errror al comparar contraseñas:', err);
                return res.status(500).json({ message: 'Error en el servidor.'});
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales invalidas' });
            }

            //Generar un token JWT
            const payload = { userId: userRecord };
            const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            //Devolver el token como respuesta
            res.status(200).json({ token });
        });
    });
};