const Router = require('express').Router()

const RegisterMiddleware = require('../middlewares/RegisterMiddleware.js')
const { login: LoginMiddleware } = require('../middlewares/LoginMiddleware.js')
const RegisterController = require('../controllers/RegisterController.js')
const LoginController = require('../controllers/LoginController.js')
const { errorHandler } = require('../errors/errorHandler.js');
const { auth, GET_auth } = require('../controllers/auth.js');
const { refreshToken } = require('../middlewares/refreshToken.js');
const { authenticate } = require('../middlewares/authenticate.js')
const { Prods } = require('../Prods.js')
const { request, response } = require('express')

// Rota de registro
Router.post('/register',RegisterMiddleware.register, RegisterController.register);
Router.get('/register',RegisterController.GET_register);

// Rota de login
// magic email
// Router.post('/login2',LoginController.login2);
// Router.get('/login2',LoginController.GET_login2);


Router.post('/login', LoginMiddleware, LoginController.login);
Router.get('/login', LoginController.GET_login);

Router.post('/refreshToken', refreshToken);

Router.post('/products', authenticate, Prods);
Router.get('/products', (request, response) => {
	response.send('<h1>Hello John</h1>')
})


module.exports = Router
