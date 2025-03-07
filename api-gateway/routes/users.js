const express = require('express');
const router = express.Router();

const userHandler = require('./handlers/users');
const veriryToken = require('../middlewares/verifyToken');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.put('/', veriryToken, userHandler.update);
router.get('/', veriryToken, userHandler.getUser);
router.post('/logout', veriryToken, userHandler.logout);

module.exports = router;
