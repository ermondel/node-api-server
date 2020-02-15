const express = require('express');
const apisRouter = require('./routers/apis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(apisRouter);

app.listen(PORT, () => {
  console.log('Server is up on port: ' + PORT);
});
