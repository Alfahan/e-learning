const express = require('express');
const router = express.Router();

const lessonHandler = require('./handlers/lessons');

router.get('/', lessonHandler.getAll);
router.get('/:id', lessonHandler.get);

router.post('/', lessonHandler.create);
router.put('/:id', lessonHandler.update);
router.delete('/:id', lessonHandler.destroy);

module.exports = router;