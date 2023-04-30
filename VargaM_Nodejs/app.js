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

const user_model = mongoose.model('User');

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
passport.use('user', new localStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      // Keresd meg a felhasználót az adatbázisban
      const user = await user_model.findOne({ username: username });
  
      // Ha nincs ilyen felhasználó, jelezd a hibát
      if (!user) {
        return done(null, false, { message: 'Helytelen felhasználónév vagy jelszó' });
      }
  
      // Ellenőrizd a jelszót
      const isPasswordValid = user.comparePassword(password);
  
      // Ha a jelszó helytelen, jelezd a hibát
      if (!isPasswordValid) {
        return done(null, false, { message: 'Helytelen felhasználónév vagy jelszó' });
      }
  
      // Ha minden rendben, léptesd be a felhasználót
      return done(null, user);
    } catch (error) {
      // Ha bármilyen hiba adódik, hívjuk meg a done függvényt az error paraméterrel
      return done(error);
    }
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