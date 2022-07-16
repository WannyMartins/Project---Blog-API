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

};
module.exports = PostController;