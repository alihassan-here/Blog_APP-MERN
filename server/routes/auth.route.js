const express = require('express');
const router = express.Router();

//IMPORT CONTROLLERS
const { login } = require('../controllers/auth.controller')

router.post('/login', login);

module.exports = router;