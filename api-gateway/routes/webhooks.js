const express = require('express');
const router = express.Router();

const webhookHandler = require('./handlers/webhooks');

router.post('/', webhookHandler.webhook);

module.exports = router;