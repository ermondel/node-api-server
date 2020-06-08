const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/opt/:item', auth, (req, res) => {
  const item = req.params.item.toUpperCase();

  if (process.env['OPT_' + item]) {
    res.status(200).send({ opt: process.env['OPT_' + item] });
  } else {
    console.log('[opt error]', 'Option not found:', item);
    res.status(404).send();
  }
});

module.exports = router;
