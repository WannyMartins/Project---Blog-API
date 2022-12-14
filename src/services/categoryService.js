const Joi = require('joi');
const model = require('../database/models');

const CategoryService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  }, 

  create: async ({ name }) => {
    const user = await model.Category.create({ name });
    return user;
  },

  list: async () => {
    const category = await model.Category.findAll();
    return category;
  },

  categoryIdExists: async (id) => {
    const CategoryId = await model.Category.findOne({
       where: { id },
     });

     if (!CategoryId) return false;
     
    return CategoryId.id;
 },

};
module.exports = CategoryService;