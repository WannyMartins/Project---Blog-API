const express = require('express');
const middlewareError = require('./middlewares/middlewareError');

const LoginController = require('./controllers/LoginController');

const app = express();

app.use(express.json());

app.post('/login', LoginController.login);

app.use(middlewareError);

module.exports = app;
