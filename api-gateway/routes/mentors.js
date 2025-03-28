const express = require('express');
const router = express.Router();

const mentorHandler = require('./handlers/mentors');

router.get('/', mentorHandler.getAll);
router.get('/:id', mentorHandler.get);
router.post('/', mentorHandler.create);
router.put('/:id', mentorHandler.update);
router.delete('/:id', mentorHandler.destroy);

module.exports = router;