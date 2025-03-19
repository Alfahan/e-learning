const express = require('express');
const router = express.Router();

const orderPaymentsHandler = require('./handlers/order-payment');

router.get('/', orderPaymentsHandler.getOrders);

module.exports = router;