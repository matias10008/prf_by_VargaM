const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');


// Bejelentkezes
router.route('/login').post((req, res, next) => {
    if(req.body.username && req.body.password) {
        passport.authenticate('user_orders', function(error, user_order) {
            if(error) return res.status(500).send(error);
            req.login(user_order, function(error) {
                if(error) return res.status(500).send(error);
                return res.status(200).send('Sikeres bejelentkezes!');
            })
        })(req, res);
    } else {
        return res.status(400).send('Hibas keres, username es password kell');
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

module.exports = router;