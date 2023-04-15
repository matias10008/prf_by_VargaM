const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const port = process.env.port || 3000;
const dbUrl = 'mongodb+srv://admin:asdasdasd@prf-beadando-cluster.m6x1cnh.mongodb.net/test'

mongoose.connect(dbUrl);


app.use(cors());

app.use((req, res, next) => {

    console.log('A middleware futott!');

    next();
  })


app.use('/api/users', require('./usersRouter'))

app.use('', express.static('public'))


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})