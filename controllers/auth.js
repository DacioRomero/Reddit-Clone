// controllers/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

// SIGN UP FORM
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(user => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.redirect('/');
    })
    .catch(error => {
        console.error(error.message);
        return res.status(400).send({err});
    });
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }, "username password")
    .then(user => {
        if(!user) {
            return res.status(401).send({ message: "Wrong Username or Password" });
        }

        user.comparePassword(password, (err, isMatch) => {
            if(!isMatch) {
                return res.status(401).send({ message: "Wrong Username or Password" });
            }

            const token = jwt.sign({_id: user._id, user: user.username}, process.env.SECRET, { expiresIn: '60 days' });

            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        })
    })
    .catch(error => {
        console.error(error.message);
    })
});

router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = router;
