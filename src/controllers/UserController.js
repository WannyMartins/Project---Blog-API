
create: async (req, res) => {
  const { email, passwordHash, name, phone } = usersService.validateBody(req.body);

  const user = await usersService.create({ email, passwordHash, name, phone });

  res.status(201).json(user);
},
