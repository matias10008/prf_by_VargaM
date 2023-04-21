const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const passport = require('passport')
const expressSession = require('express-session')
const localStrategy = require('passport-local').Strategy;


const port = process.env.port || 3000;
const dbUrl = 'mongodb+srv://admin:asdasdasd@prf-beadando-cluster.m6x1cnh.mongodb.net/test'


mongoose.connect(dbUrl);



app.use(cors());

app.use(expressSession({secret:'idkwhattodo', resave:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {

    console.log('A middleware futott!');

    next();
  })


app.use('/api/users', require('./usersRouter'))

app.use('', express.static('public'))


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})