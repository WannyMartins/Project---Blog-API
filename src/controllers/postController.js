const jwt = require('../services/jwtService');
const PostService = require('../services/postService');

const PostController = {
  // list: async (req, res) => {
  //   const users = await PostService.list();
  //   res.status(200).json(users);
  // },  

  create: async (req, res) => {
     const post = PostService.validateBody(req.body);
     console.log(req.headers.authorization);
     const userId = await jwt.getUserIdToken(req.headers.authorization);

     const posts = await PostService.create(post);
     const result = { ...posts.toJSON(), userId };
    res.status(201).json(result);
  },  

};
module.exports = PostController;