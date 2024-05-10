const Router = require('express').Router()

const RegisterMiddleware = require('../middlewares/RegisterMiddleware.js')
const LoginMiddleware = require('../middlewares/LoginMiddleware.js')
const RegisterController = require('../controllers/RegisterController.js')
const LoginController = require('../controllers/LoginController.js')

const { redirect } = require('../middlewares/RedirectMiddleware.js');

Router.post('/register', redirect, RegisterMiddleware.register, RegisterController.register);
Router.get('/register', redirect, RegisterController.GET_register);

// Login
Router.post('/login', LoginMiddleware.login, LoginController.login); /*redirect, */
Router.get('/login', redirect, LoginController.GET_login);

module.exports = Router