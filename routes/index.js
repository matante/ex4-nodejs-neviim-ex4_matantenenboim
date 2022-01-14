var express = require('express');
var router = express.Router();
const Cookies = require('cookies');
const keys = ['dragon leaf'];

const db = require('../models'); //contain the User model, which is accessible via db.User

const notExist = "Email or password could not be found, try again :)"

router.get('/', function (req, res) {

    if (req.session.email) {
        return res.render('home', {firstName: req.session.firstName, lastName: req.session.lastName});
    }
    return res.render('index', {msg: ''});
});

router.post('/', function (req, res) {
    const email = req.body.email.trim().toLowerCase()
    const password = req.body.loginPassword // no need to trim password because " " is a legit char

    db.User.findOne({
        where: {
            email: email,
            password: password
        },
    }).then(user => {
        if (!user) {

            return res.render('index', {msg: notExist});
        }


        const cookies = new Cookies(req, res, {keys: keys})
        const loginCookie = cookies.get("loginCookie")

        cookies.set("loginCookie", new Date().toISOString())

        req.session.email = email
        req.session.firstName = user.dataValues.firstName
        req.session.lastName = user.dataValues.lastName // trimmed earlier all

        return res.redirect("/"); // to prevent reload/going back

    }).catch(() => {
        return res.render('index', {msg: notExist});
    });


});

router.get('/logout', function (req, res) {
    req.session.destroy()
    return res.redirect('/');
});

router.post('/completed', function (req, res) {

    const cookies = new Cookies(req, res, {keys: keys})
    const registrationCookie = cookies.get("registrationCookie")

    if (!registrationCookie) { // expired
        return res.render('register', {inUse: false, expired: true});
    }

    db.User.findOne({
        where: {email: req.session.tempEmail},
    })
        .then((user) => {
            if (!user) {
                db.User.create({
                    email: req.session.tempEmail,
                    firstName: req.session.firstName,
                    lastName: req.session.lastName, // all thses ↑ trimmed earlier
                    password: req.body.password
                })
                    .then((user) => {
                        req.session.destroy();
                        return res.render('done')
                    })
                    .catch((err) => {
                        console.log('*** error creating a user', JSON.stringify(user))
                        return res.status(400).send(err)
                    })
            }
        }).catch(() => {
        // else, exist
        return res.render('register', {inUse: true, expired: false});

    })


});

router.get('/completed', function (req, res) {
    return res.redirect("/");
});



// for all other addresses the user might enter...
router.get('*', function (req, res) {
    return res.redirect('/');
});

module.exports = router;
