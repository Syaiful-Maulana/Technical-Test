const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// repository
const userRepository = require('../repository/AuthRepository');

const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(req.body.password, saltRounds);

    // delete req.body.password;
    req.body.password = password_hash;

    const { id } = await userRepository.createUser(req.body);

    // delete req.body.password_hash;
    const { ...body } = req.body;
    const response = {
      id,
      ...body,
    };

    return res.respondCreated(response, 'user successfully registered');
  } catch (err) {
    return res.respond(null, err.message, err.code);
  }
};

function createAccessToken(id, email) {
  const payload = { id, email };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN });
}

function createRefreshToken(id, email) {
  const payload = { id, email };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN });
}

function accessTokenJSON(accessToken) {
  return {
    accessToken,
    token_type: 'Bearer',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  };
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const rows = await userRepository.find({ email });
    // User Not Found
    if (rows.length <= 0) {
      return res.notAuthorized("email and password doesn't match");
    }

    const user = rows[0];
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame === false) {
      return res.notAuthorized("email and password doesn't match");
    }

    req.user = user;
  } catch (error) {
    return res.respondServerError(error.message);
  }

  return next();
};

const getTokenAfterLogin = async (req, res) => {
  const { id, email } = req.user;

  try {
    const accessToken = createAccessToken(id, email);
    const refreshToken = createRefreshToken(id, email);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.respondSuccess({
      user: {
        id,
        email,
      },
      accessToken: accessTokenJSON(accessToken),
      refreshToken: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
      },
    });
  } catch (error) {
    return res.respondServerError(error.message);
  }
};

const getAccessToken = async (req, res) => {
  if (!req.cookies?.jwt) return res.notAcceptable('Unauthorized');

  const refreshToken = req.cookies.jwt;
  if (refreshToken === null) {
    return res.notAcceptable('Unauthorized');
  }

  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.forbidden(err.message);

      const accessToken = createAccessToken(user.id, user.email);
      return res.respondSuccess(accessTokenJSON(accessToken));
    });
  } catch (error) {
    return res.respondServerError(error.message);
  }
};

module.exports = {
  registerUser,
  login,
  getTokenAfterLogin,
  getAccessToken,
};
