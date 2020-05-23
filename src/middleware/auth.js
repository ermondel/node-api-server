const auth = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const headerAuth = req.headers.authorization;
  const envAuthKey = process.env.AUTH_KEY;
  const whiteList = process.env.WHITE_LIST;
  const ref = req.headers.referer;
  const dn = ref
    ? ref[ref.length - 1] === '/'
      ? ref.slice(0, -1)
      : ref
    : undefined;
  let errorMessage = '';

  // checks
  if (userAgent && userAgent.indexOf('PostmanRuntime') > -1) {
    if (!headerAuth) {
      errorMessage = 'Auth key not found in the header';
    }
    if (!envAuthKey) {
      errorMessage = 'Auth key not found in the env';
    }
    if (headerAuth && envAuthKey && headerAuth !== envAuthKey) {
      errorMessage = 'Auth keys do not match';
    }
  } else {
    if (!whiteList) {
      errorMessage = 'No whitelist found';
    }
    if (whiteList && whiteList.indexOf(dn) < 0) {
      errorMessage = 'deny: ' + dn;
    }
  }

  // result
  if (errorMessage) {
    console.log('[auth error]', errorMessage);
    res.status(401).send({ error: 'Unauthorized' });
  } else {
    next();
  }
};

module.exports = auth;
