const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//Definicion de las rutas
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;