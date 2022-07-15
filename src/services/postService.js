const Joi = require('joi');
const models = require('../database/models');
const CategoryService = require('./categoryService');

const PostService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  create: async ({ title, content, categoryIds }) => {
     await categoryIds.map((id) => CategoryService.categoryIdExists(id));

    const post = await models.BlogPost.create({ title, content });

    return post;
  },

  // create: async ({ title, content, categoryIds }) => {
  //   const categories = await categoryIds.map((id) => CategoryService.categoryIdExists(id));

  //   const post = await models.BlogPosts.create({ title, content, categories });

  //   return post;
  // },

//  list: async () => {
//   const posts = await models.BlogPost.findAll({ include: [
//       { model: models.User, as: 'User', attributes: { exclude: 'password' } },
//       { model: models.Category, as: 'Category' },
//     ],
// });
//   const postsData = posts.map(({ dataValues }) => dataValues)
//    .map(({ id, title, content, userId, published, updated, User, Category }) => ({
//     id, title, content, userId, published, updated, User: User.dataValues, categories: Category,
//   }));

//   return postsData;
// },
};

module.exports = PostService;