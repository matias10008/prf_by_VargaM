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
//Tyre lekeres
router.get('/products', (req, res) => {
  tyre_model.find()
    .then(tyres => res.status(200).json(tyres))
    .catch(err => res.status(500).send('DB hiba: ' + err));
});

//Addtyre
router.post('/addtyre', (req, res) => {
  console.log(req.body);
  if (req.body.newtyreName && req.body.newtyreType && req.body.newtyreWidth && req.body.newtyreHeight && req.body.newtyreDiameter && req.body.newtyrePrice ) {
    tyre_model.findOne({ newtyreName: req.body.newtyreName, newtyreType: req.body.newtyreType,
      newtyreWidth: req.body.newtyreWidth, newtyreHeight: req.body.newtyreHeight,
      newtyreDiameter: req.body.newtyreDiameter,newtyrePrice: req.body.newtyrePrice
     })
      .then(tyre => {
        if (tyre) {
          return res.status(400).send('Hiba, már létezik ilyen Abroncs');
        }

        const newtyreName = req.body.newtyreName;
        const newtyreType = req.body.newtyreType;
        const newtyreWidth = req.body.newtyreWidth;
        const newtyreHeight = req.body.newtyreHeight;
        const newtyreDiameter = req.body.newtyreDiameter;
        const newtyrePrice = req.body.newtyrePrice;
        const newTyre = new tyre_model({
          name : newtyreName,
          type: newtyreType,
          price: newtyrePrice,
          width : newtyreWidth,
          height : newtyreHeight,
          diameter : newtyreDiameter
        });
        newTyre.save()
        .then(() => res.status(200).send('Sikeresen hozzáadta az abroncsot!'))
        .catch(err => {
          res.status(500).send('A hozzáadás során hiba történt');
        }); 
      })
      .catch(err => res.status(500).send('DB hiba')); 
  } else {
    return res.status(400).send('Hibás kérés, a gumiabroncs hozzáadásakot');
  }
});

router.post('/deleteTyre', (req, res) => {
  console.log(req.body);
  if (req.body.tyreName && req.body.tyrePrice ) {
        tyre_model.deleteOne({name: req.body.tyreName,price: req.body.tyrePrice})
        .then(() => res.status(200).send('Sikeresen törölted az abroncsot!'))
        .catch(err => {
          res.status(500).send('A törlés során hiba történt');
        }); 
      }
    }
);

router.post('/updateTyre', async (req, res) => {
  const { oldTyre, updatedTyre } = req.body;

  try {
    const tyre = await tyre_model.findOne({ name: oldTyre.name, type: oldTyre.type });
    if (!tyre) {
      return res.status(404).json({ message: 'Tyre not found' });
    }

    Object.assign(tyre, updatedTyre);
    await tyre.save();
    res.status(200).json({ message: 'Tyre updated successfully' });
  } catch (error) {
    console.error('Error in updateTyre route:', error);
    res.status(500).json({ message: 'An error occurred during the update', error });
  }
});

//User lekeres
router.get('/users', (req, res) => {
  user_model.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('DB hiba: ' + err));
});

//user torles
router.post('/deleteUser', (req, res) => {
  console.log(req.body);
  if (req.body.username && req.body.email ) {
        user_model.deleteOne({username: req.body.username,email: req.body.email})
        .then(() => res.status(200).send('Sikeresen törölted a felhasználót!'))
        .catch(err => {
          res.status(500).send('A törlés során hiba történt');
        }); 
      }
    }
);

//Order lekeres
router.get('/orders', (req, res) => {
  order_model.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('DB hiba: ' + err));
});

module.exports = router;