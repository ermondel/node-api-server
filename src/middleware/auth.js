const auth = (req, res, next) => {
  const whiteList = process.env.WHITE_LIST;
  const allow = whiteList.split(';').includes(req.headers.referer);

  if (allow) {
    next();
  } else {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
