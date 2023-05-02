const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const tyre_model = mongoose.model('Tyre');
const user_model = mongoose.model('User');
const order_model = mongoose.model('Order');



//Login
router.route('/login').post((req, res, next) => {
  if (req.body.username && req.body.password) {
    passport.authenticate('user', (error, user, info) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (!user) {
        return res.status(401).send(info.message);
      }
      req.login(user, function (error) {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(200).send('Successful login!');
      });
    })(req, res, next);
  } else {
    return res.status(400).send('Incorrect request, username es password required');
  }
});

//Register
router.post('/register', (req, res) => {
  if (req.body.username && req.body.password && req.body.email ) {
    user_model.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          return res.status(400).send('Error, this username already exists');
        }

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const newUser = new user_model({
            username : username,
            email: email,
            password: password
        });
        newUser.save()
        .then(() => res.status(200).send('Successful registration'))
        .catch(err => {
          res.status(500).send('An error occurred during the rescue');
        }); 
      })
      .catch(err => res.status(500).send('DB problem')); 
  } else {
    return res.status(400).send('Incorrect request, username, email and password required');
  }
});

//Logout
router.route('/logout').post((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send('An error occurred during logout');
      }
      return res.status(200).send('Successful logout');
    });
  } else {
    return res.status(403).send('It was not even logged in');
  }
});

//Tyre get
router.get('/products', (req, res) => {
  tyre_model.find()
    .then(tyres => res.status(200).json(tyres))
    .catch(err => res.status(500).send('DB problem: ' + err));
});

//Addtyre
router.post('/addtyre', (req, res) => {
  if (req.body.newtyreName && req.body.newtyreType && req.body.newtyreWidth && req.body.newtyreHeight && req.body.newtyreDiameter && req.body.newtyrePrice ) {
    tyre_model.findOne({ newtyreName: req.body.newtyreName, newtyreType: req.body.newtyreType,
      newtyreWidth: req.body.newtyreWidth, newtyreHeight: req.body.newtyreHeight,
      newtyreDiameter: req.body.newtyreDiameter,newtyrePrice: req.body.newtyrePrice
     })
      .then(tyre => {
        if (tyre) {
          return res.status(400).send('Error, such a tyre already exists');
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
        .then(() => res.status(200).send('Successfully added the tyre!'))
        .catch(err => {
          res.status(500).send('An error occurred during addition');
        }); 
      })
      .catch(err => res.status(500).send('DB problem')); 
  } else {
    return res.status(400).send('Incorrect request when adding a tyre');
  }
});

router.post('/deleteTyre', (req, res) => {
  if (req.body.tyreName && req.body.tyrePrice ) {
        tyre_model.deleteOne({name: req.body.tyreName,price: req.body.tyrePrice})
        .then(() => res.status(200).send('You have successfully deleted the tyre!'))
        .catch(err => {
          res.status(500).send('An error occurred during the deletion');
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
    res.status(500).json({ message: 'An error occurred during the update', error });
  }
});

//User get
router.get('/users', (req, res) => {
  user_model.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('DB problem: ' + err));
});

//user delete
router.post('/deleteUser', (req, res) => {
  if (req.body.username && req.body.email ) {
        user_model.deleteOne({username: req.body.username,email: req.body.email})
        .then(() => res.status(200).send('You have successfully deleted the user!'))
        .catch(err => {
          res.status(500).send('An error occurred during the deletion');
        }); 
      }
    }
);

//Order get
router.get('/orders', (req, res) => {
  order_model.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('DB problem: ' + err));
});

//Order submit
router.post('/submitOrder', async (req, res) => {
  try {
    const { billingName, address, cartItems } = req.body;
    const newOrder = new order_model({
      name:billingName,
      address:address,
      tyres:cartItems,
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order successfully created', orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the order', error });
  }
});

//Order get
router.get('/orders', (req, res) => {
  order_model.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('DB problem: ' + err));
});

module.exports = router;