const express = require('express');
const router = new express.Router();

router.get('', (req, res) => {
  res.status(200).send('node api server');
});

router.get('/rnd', (req, res) => {
  res.status(200).send({ data: Math.floor(Math.random() * 100) });
});

module.exports = router;
