const LoginService = require('../services/LoginService');
const jwtService = require('../services/jwtService');

const LoginController = {
  login: async (req, res) => {
    const { email, password } = LoginService.validateBody(req.body);

    const token = await LoginService.login(email, password);

    res.status(200).json({ token });
  },

  validateToken: (req, res, next) => {
    const { authorization } = req.headers;
   
    jwtService.validateToken(authorization);

    next();
  },
};

module.exports = LoginController;