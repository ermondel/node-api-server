const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = new express.Router();

const APIConfig = {
  youtube: {
    url: 'https://www.googleapis.com/youtube/v3/search',
    key: process.env.YOUTUBE_API,
    keyParam: 'key',
  },
  unsplash: {
    url: 'https://api.unsplash.com/search/photos',
    key: 'Client-ID ' + process.env.UNSPLASH_API,
    keyHeader: 'Authorization',
  },
  openweathermap: {
    url: 'http://api.openweathermap.org/data/2.5/forecast',
    key: process.env.OPENWEATHERMAP_API,
    keyParam: 'appid',
  },
};

router.get('/request/:api', auth, async (req, res) => {
  const api = req.params.api;
  let errorMessage = '';

  if (!APIConfig[api]) {
    errorMessage = 'No configuration found for the API';
  }

  if (APIConfig[api] && !APIConfig[api].key) {
    errorMessage = 'The key for the API is not specified in the config';
  }

  if (errorMessage) {
    console.log('[api error]', 500, errorMessage);
    res.status(500).send();
  } else {
    const axiosConfig = {
      params: { ...req.query },
      headers: {},
    };

    if (APIConfig[api].keyParam) {
      const param = APIConfig[api].keyParam;
      axiosConfig.params[param] = APIConfig[api].key;
    }

    if (APIConfig[api].keyHeader) {
      const item = APIConfig[api].keyHeader;
      axiosConfig.headers[item] = APIConfig[api].key;
    }

    const request = axios.create(axiosConfig);

    try {
      const response = await request.get(APIConfig[api].url);
      res.status(200).send(response.data);
    } catch (error) {
      console.log('[error]', 500, error.message);
      res.status(500).send();
    }
  }
});

module.exports = router;
