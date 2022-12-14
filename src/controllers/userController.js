const jwtService = require('../services/jwtService');
const usersService = require('../services/userService');

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

  findById: async (req, res) => {
    const { id } = req.params;
    const users = await usersService.findById(id);
    res.status(200).json(users);
  },

  delete: async (req, res) => {
    const userId = await jwtService.getUserIdToken(req.headers.authorization);
    await usersService.delete(userId);
    res.sendStatus(204);
  },

};

module.exports = UserController;