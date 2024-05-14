const express = require('express');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const ExpressLayouts = require('express-ejs-layouts');

const userRoutes = require('./Routes/userRoutes.js');
const Accounts = require('./Routes/Accounts.js');
const User = require('./db/models/registrer/User.js');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

dotenv.config();
// view engine setup
// app.engine('html', require('ejs').renderFile);
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(ExpressLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect(process.env.DB_Connect).then((/*client*/) => {
    console.log("Db connected to mongoDB");
})
.catch((e) => {
    console.log(`error to connect in database ${e}`);
})

app.use('/', userRoutes);
app.use('/customer/account', Accounts);

app.listen(5000,() => {
    console.log(`listen in port 5000`); // o server deve apenas rodar se o banco rodar!
})

/*curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh*/