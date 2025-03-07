const express = require('express');
const router = express.Router();

const courseHandler = require('./handlers/courses');

const verifyToken = require('../middlewares/verifyToken');

router.get('/', courseHandler.getAll);
router.get('/:id', courseHandler.get);

router.post('/', verifyToken, courseHandler.create);
router.put('/:id', verifyToken, courseHandler.update);
router.delete('/:id', verifyToken, courseHandler.destroy);

module.exports = router;