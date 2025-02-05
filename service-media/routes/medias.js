const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const db = require('../models'); // Pastikan import models dengan benar
const Medias = db.Medias; // Harus sesuai dengan nama model di `models/Medias.js`

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

module.exports = router;
