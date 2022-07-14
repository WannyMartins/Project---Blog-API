const express = require('express');
const middlewareError = require('./middlewares/middlewareError');

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const app = express();

app.use(express.json());

app.post('/login', LoginController.login);
app.post('/user', UserController.create);

app.use(middlewareError);

module.exports = app;
