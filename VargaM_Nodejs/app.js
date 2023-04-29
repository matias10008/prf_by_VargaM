const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const user = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://admin:asdasdasd@prf-beadando-cluster.m6x1cnh.mongodb.net/test'

//const dbUrl = 'mongodb://localhost:1586';

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortént', err);
})

require('./models/user');
require('./models/tyre');
require('./models/order');

const user_model = mongoose.model('User');
const tyre_model = mongoose.model('Tyre');
const order_model = mongoose.model('Order');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

const whiteList = ['http://localhost:4200'];


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    }
    next(); 
})

passport.use('User', new localStrategy(function (username, password, done) {
    user.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));


passport.serializeUser(function (user, done) {
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});

app.use(expressSession({ secret: 'remelematmegyekebbol', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))


app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('The server is running!');
})

app.use((req, res, next) => {
    console.log('ez a hibakezelo');
    res.status(404).send('A kert eroforras nem talalhato');
})