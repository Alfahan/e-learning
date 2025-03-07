const express = require('express');
const router = express.Router();

const imageCoursesHandler = require('./handlers/image-courses');

router.post('/', imageCoursesHandler.create);
router.delete('/:id', imageCoursesHandler.destroy);

module.exports = router;