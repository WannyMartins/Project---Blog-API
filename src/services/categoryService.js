const Joi = require('joi');
const model = require('../database/models');

const CategoryService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
    return value;
  }, 

  create: async ({ name }) => {
    const user = await model.Category.create({ name });
    return user;
  },

};
module.exports = CategoryService;