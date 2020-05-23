const express = require('express');
const apisRouter = require('./routers/apis');
const utilRouter = require('./routers/util');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  const whiteList = process.env.WHITE_LIST;
  const origin = req.headers.origin;

  if (!whiteList) {
    console.log('[error]', 'No whitelist found');
    res.status(500).send();
  } else {
    if (whiteList.indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
    }
    next();
  }
});

app.use(express.json());
app.use(utilRouter);
app.use(apisRouter);

app.listen(PORT, () => {
  console.log('[log] server is up on port: ' + PORT);
});
