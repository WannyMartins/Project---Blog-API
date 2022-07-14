const usersService = require('../services/UserService');

const UserController = {
  create: async (req, res) => {
    const user = usersService.validateBody(req.body);

    await usersService.emailExist(user.email);

    const token = await usersService.create(user);

    res.status(201).json({ token });
  },

  list: async (req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },
};

module.exports = UserController;