const LoginService = require('../services/loginService');

const LoginController = {
  login: async (req, res) => {
    const { email, password } = LoginService.validateBody(req.body);

    const token = await LoginService.login(email, password);

    res.status(200).json({ token });
  },

};

module.exports = LoginController;