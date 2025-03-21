const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const fs = require('fs');

const db = require('../models');
const Medias = db.Medias;

router.get('/', async(req, res) => {
  const media = await Medias.findAll({
    attributes: ['id', 'image']
  });

  const mappedMedia = media.map((m) => {
    m.image = `${req.get('host')}/${m.image}`;
    return m;
  })

  return res.json({
    status: 'success',
    data: mappedMedia,
  });
})


router.post('/', async (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: 'error', message: 'invalid base64' });
  }

  base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    const __filename = filepath.split('\\').pop().split('/').pop();
    try {
      const media = await Medias.create({ image: `images/${__filename}` });

      return res.json({
        status: 'success',
        data: {
          id: media.id,
          image: `${req.get('host')}/images/${__filename}`
        }
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const media = await Medias.findByPk(id);

  if (!media) {
    return res.status(404).json({ status: 'error', message: 'media not found' });
  }

  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    await media.destroy();

    return res.json({
      status: 'success',
      message: 'image deleted'
    });
  });
});

module.exports = router;
