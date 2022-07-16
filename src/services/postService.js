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
      error.message = 'Some required fields are missing';
      error.status = 400;
      throw error;
    }
    return value;
  },

  create: async ({ title, content, categoryIds }) => {
   const CategoryId = await Promise.all(categoryIds.map(async (id) => {
    const result = await CategoryService.categoryIdExists(id);
    return result;
  }));

  const result = CategoryId.some((id) => id === false);
  
    if (result === true) {
      const error = new Error('"categoryIds" not found');
      error.status = 400;
      throw error;
    }

    const post = await models.BlogPost.create({ title, content });

    const { id } = post;

    Promise.all(CategoryId.map((cat) => models.PostCategory.bulkCreate([
        { postId: id, categoryId: cat },
      ])));

    return post;
  },

  list: async () => {
    const posts = await models.BlogPost.findAll({
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  },

  findById: async (id) => {
    const post = await models.BlogPost.findOne({
      where: { id },
      include: [
        { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }
    return post;
  },

};

module.exports = PostService;