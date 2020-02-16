const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/rnd', auth, (req, res) => {
  const content = Math.floor(Math.random() * 100);

  res.status(201).send({ content });
});

router.get('/youtube', auth, async (req, res) => {
  const youtube = await axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      ...req.query,
      key: process.env.YOUTUBE_API
    }
  });

  youtube
    .get('/search', {
      params: { q: req.query.q }
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

module.exports = router;
