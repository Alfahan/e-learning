const express = require('express');
const router = express.Router();

const chapterHandler = require('./handlers/chapters');

router.get('/', chapterHandler.getAll);
router.get('/:id', chapterHandler.get);
router.post('/', chapterHandler.create);
router.put('/:id', chapterHandler.update);
router.delete('/:id', chapterHandler.destroy);

module.exports = router;