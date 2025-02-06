const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('./handlers/refresh-Tokens');

router.post('/', refreshTokensHandler.create);
router.get('/', refreshTokensHandler.getToken);

module.exports = router;
