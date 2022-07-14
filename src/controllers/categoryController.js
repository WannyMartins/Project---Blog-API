const categoryServices = require('../services/categoryService');

const CategoryController = {
  create: async (req, res) => {
    const dados = categoryServices.validateBody(req.body);

    const category = await categoryServices.create(dados);

    res.status(201).json(category);
  },

  list: async (req, res) => {
    const Category = await categoryServices.list();
    res.status(200).json(Category);
  },

  // findById: async (req, res) => {
  //   const Category = await categoryServices.findById(req.params.id);
  //   res.status(200).json(Category);
  // },
};

module.exports = CategoryController;