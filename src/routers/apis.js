const express = require('express');
const router = new express.Router();

router.get('/rnd', (req, res) => {
  const content = Math.floor(Math.random() * 100);

  console.log('---', req.query);
  console.log('---', req.params);

  res.status(201).send({ content });
});

module.exports = router;
