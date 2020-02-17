const auth = (req, res, next) => {
  const allowedOrigins = process.env.WHITE_LIST.split(';').map((el) => el + '/');
  const referer = req.headers.referer;

  if (allowedOrigins.indexOf(referer) >= 0) {
    next();
  } else {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
