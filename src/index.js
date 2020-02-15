const express = require('express');
const apisRouter = require('./routers/apis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(apisRouter);

app.listen(PORT, () => {
  console.log('Server is up on port: ' + PORT);
});
