const Router = require('express').Router()

// const { errorHandler } = require('../errors/errorHandler.js');
const { refreshToken } = require('../middlewares/refreshToken.js');



const { authenticate } = require('../middlewares/authenticate.js');
const { homeGet } = require('../controllers/HomeController.js');
const { intro } = require('../controllers/introduction.js');



Router.get('/home', homeGet);
Router.get('/intro', intro);

Router.post('/refreshToken', authenticate, refreshToken);


module.exports = Router
