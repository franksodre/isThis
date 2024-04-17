const express = require('express');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');


const Router = require('./Routes/userRoutes.js');

const app = express();
app.use(express.json());
app.use(cookie());

dotenv.config();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.use('/static', express.static(path.join(__dirname, 'Public')))
app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect(process.env.DB_Connect).then(() => {
    console.log("Db connected to mongoDB");
})
.catch((e) => {
    console.log(`error to connect in database ${e}`);
})


app.use('/api/users/', Router);

app.listen(5000,() => {
    console.log(`listen in port 5000`);
})
