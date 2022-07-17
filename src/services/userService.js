const Joi = require('joi');
const model = require('../database/models');
const jwtService = require('./jwtService');

const UserService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  emailExist: async (email) => {
     const userEmail = await model.User.findOne({
        where: { email },
      });

      if (userEmail) {
        const error = new Error('User already registered');
        error.status = 409;
        throw error;
      }
  },

  create: async ({ displayName, email, password, image }) => {
    const user = await model.User.create({ displayName, email, password, image });

    const { 
      id, 
      displayName: displayNamePreenchido,
      email: emailPreenchido, 
      image: imagePreenchido,
     } = user.toJSON();

    const token = jwtService.createToken({
      id,
      displayNamePreenchido,
      emailPreenchido,
      imagePreenchido,
    });

    return token;
  },

  list: async () => {
    const users = await model.User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  findById: async (id) => {
    const user = await model.User.findOne({ attributes: { exclude: ['password'] }, where: { id } });

    if (!user) {
      const error = new Error('User does not exist');
      error.status = 404;
      throw error;
    }
    return user;
  },

  delete: async (id) => {
    const post = await model.User.destroy({ where: { id } });

    return post;
  },

};

module.exports = UserService;