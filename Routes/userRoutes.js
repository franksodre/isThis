const Router = require('express').Router()
const { request, response } = require('express')

const RegisterMiddleware = require('../middlewares/RegisterMiddleware.js')
const { login: LoginMiddleware } = require('../middlewares/LoginMiddleware.js')
const RegisterController = require('../controllers/RegisterController.js')
const LoginController = require('../controllers/LoginController.js')
const { errorHandler } = require('../errors/errorHandler.js');
const { auth, GET_auth } = require('../controllers/auth.js');
const { refreshToken } = require('../middlewares/refreshToken.js');
const { authenticate } = require('../middlewares/authenticate.js');
// const { authRefreshToken } = require('../middlewares/authRefreshToken.js')

// registro
Router.post('/register', RegisterMiddleware.register, RegisterController.register);
Router.get('/register',  RegisterController.GET_register);

// Login
Router.post('/login', LoginMiddleware, LoginController.login);
Router.get('/login', LoginController.GET_login);

Router.post('/refreshToken', refreshToken);

module.exports = Router
