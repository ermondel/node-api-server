const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/youtube', auth, async (req, res) => {
  const youtube = await axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
      ...req.query,
      key: process.env.YOUTUBE_API,
    },
  });

  youtube
    .get('/search', {
      params: { q: req.query.q },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

router.get('/unsplash', auth, async (req, res) => {
  const unsplash = await axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization: 'Client-ID ' + process.env.UNSPLASH_API,
    },
  });

  unsplash
    .get('/search/photos', {
      params: {
        query: req.query.q,
      },
    })
    .then((response) => {
      if (response.headers['x-ratelimit-remaining'] > 0) {
        res.status(200).send(response.data);
      } else {
        res.status(500).send();
      }
    })
    .catch((error) => {
      res.status(500).send();
    });
});

router.get('/openweathermap', auth, async (req, res) => {
  const openweathermap = await axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
      ...req.query,
      appid: process.env.OPENWEATHERMAP_API,
    },
  });

  openweathermap
    .get('/forecast')
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

module.exports = router;
