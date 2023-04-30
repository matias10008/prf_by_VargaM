const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const tyre_model = mongoose.model('Tyre');
const user_model = mongoose.model('User');
const order_model = mongoose.model('Order');



// Bejelentkezes
router.route('/login').post((req, res, next) => {
  if (req.body.username && req.body.password) {
    passport.authenticate('user', (error, user, info) => {
      if (error) {
        console.error('Authentication error:', error);
        return res.status(500).send(error);
      }
      if (!user) {
        console.error('Authentication failed:', info);
        return res.status(401).send(info.message);
      }
      req.login(user, function (error) {
        if (error) {
          console.error('Login error:', error);
          return res.status(500).send(error);
        }
        return res.status(200).send('Sikeres bejelentkezes!');
      });
    })(req, res, next);
  } else {
    return res.status(400).send('Hibas keres, username es password kell');
  }
});

//Regisztracio
router.post('/register', (req, res) => {
  if (req.body.username && req.body.password && req.body.email ) {
    user_model.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          return res.status(400).send('Hiba, már létezik ilyen felhasználónév');
        }

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const newUser = new user_model({
            username : username,
            email: email,
            password: password
        });
        console.log('newUser objektum előtt:', newUser);
        newUser.save()
        .then(() => res.status(200).send('Sikeres regisztráció'))
        .catch(err => {
          res.status(500).send('A mentés során hiba történt');
        }); 
      })
      .catch(err => res.status(500).send('DB hiba')); 
  } else {
    return res.status(400).send('Hibás kérés, username, email és password kell');
  }
});

//Kijelentkezes
router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
});

//Status lekerese
router.route('/status').get((req, res, next) => {
    if(req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
    
})

router.get('/products', (req, res) => {
  tyre_model.find()
    .then(tyres => res.status(200).json(tyres))
    .catch(err => res.status(500).send('DB hiba: ' + err));
});

module.exports = router;