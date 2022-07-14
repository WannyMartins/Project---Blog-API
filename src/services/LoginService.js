const Joi = require('joi');
const model = require('../database/models');
const jwtService = require('./jwtService');

const LoginServices = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
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
      error.name = 'UnauthorizedError';
      error.status = 400;
      throw error;
    }

    const { id, displayName, email: emailPreenchido, image } = user.dataValues;

    const token = jwtService.createToken({ id, displayName, emailPreenchido, image });

    return token;
  },

};
module.exports = LoginServices;