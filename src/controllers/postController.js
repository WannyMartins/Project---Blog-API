const jwt = require('../services/jwtService');
const PostService = require('../services/postService');

const PostController = {
  create: async (req, res) => {
    const post = PostService.validateBody(req.body);
    const userId = await jwt.getUserIdToken(req.headers.authorization);
    
    const posts = await PostService.create(post);
    const result = { ...posts.toJSON(), userId };
    res.status(201).json(result);
  },  
  
  list: async (req, res) => {
    const posts = await PostService.list();
    res.status(200).json(posts);
  },  

  findById: async (req, res) => {
    const { id } = req.params;
    const post = await PostService.findById(id);
    res.status(200).json(post);
  },  

  update: async (req, res) => {
    const { id } = req.params;
    
    const userId = await jwt.getUserIdToken(req.headers.authorization);

    if (userId !== Number(id)) {
      const error = new Error('Unauthorized user');
      error.status = 401;
      throw error;
    }

    const validate = await PostService.validateBodyUpdate(req.body);

    const { title, content } = validate;

    await PostService.update(id, title, content);

    const post = await PostService.findById(id);
    
    res.status(200).json(post);
  },  

  delete: async (req, res) => {
    const { id } = req.params;
    
    const userId = await jwt.getUserIdToken(req.headers.authorization);
    const postExists = await PostService.findById(id);

    const idUserPost = postExists.toJSON().userId;
 
    if (userId !== Number(idUserPost)) {
      const error = new Error('Unauthorized user');
      error.status = 401;
      throw error;
    }
 
    await PostService.delete(id);
    res.sendStatus(204);
  },  

};
module.exports = PostController;