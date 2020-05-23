const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('', (req, res) => {
  res.status(200).send('node api server');
});

router.get('/ping', auth, (req, res) => {
  res.status(200).send({ status: 'ok', data: Math.floor(Math.random() * 100) });
});

module.exports = router;
