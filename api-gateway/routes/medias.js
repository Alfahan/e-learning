const express = require('express');
const router = express.Router();

const mediaHandler = require('./handlers/medias')

router.post('/', mediaHandler.create);
router.get('/', mediaHandler.getAll);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;
