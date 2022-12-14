const express = require('express');
const middlewareError = require('./middlewares/middlewareError');
const validateToken = require('./middlewares/middlewareTokenValidate');

const LoginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
const PostController = require('./controllers/postController');

const app = express();

app.use(express.json());

app.post('/login', LoginController.login);
app.post('/user', UserController.create);

app.get('/user', validateToken, UserController.list);
app.get('/user/:id', validateToken, UserController.findById);
app.delete('/user/me', validateToken, UserController.delete);

app.post('/categories', validateToken, CategoryController.create);
app.get('/categories', validateToken, CategoryController.list);

app.post('/post', validateToken, PostController.create);
app.get('/post/search', validateToken, PostController.search);

app.put('/post/:id', validateToken, PostController.update);
app.get('/post/:id', validateToken, PostController.findById);
app.delete('/post/:id', validateToken, PostController.delete);
app.get('/post', validateToken, PostController.list);

app.use(middlewareError);

module.exports = app;
