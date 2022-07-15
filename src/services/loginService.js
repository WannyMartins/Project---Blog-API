const Joi = require('joi');
const model = require('../database/models');
const jwtService = require('./jwtService');

const LoginServices = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.message = 'Some required fields are missing';
      error.status = 400;
      throw error;
    }
    return value;
  },

  login: async (email, password) => {
    const user = await model.User.findOne({
      where: { email },
    });

    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.status = 400;
      throw error;
    }

    const { password: passwordNãoJWT, ...objetoJWT } = user.toJSON();

    const token = jwtService.createToken(objetoJWT);

    return token;
  },

};
module.exports = LoginServices;