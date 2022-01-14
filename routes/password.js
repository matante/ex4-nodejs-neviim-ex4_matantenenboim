var express = require('express');
var router = express.Router();
const Cookies = require('cookies');
const db = require("../models");
const keys = ['dragon leaf'];


/* GET home page. */
router.get('/', function (req, res) {
    res.redirect('/register');
});

router.post('/', function (req, res) {
    if (req.session.email){
        return res.render('home', {firstName:req.session.firstName, lastName: req.session.lastName});
    }
    const cookies = new Cookies(req, res, {keys: keys})
    const registrationCookie = cookies.get("registrationCookie")

    const email = req.body.email.trim().toLowerCase();

    db.User.findOne({
        where: {email: email},
    }).then(user => {
        if (!user) { // new
            if (!registrationCookie) { //
                cookies.set("registrationCookie", new Date().toISOString(), {maxAge: 1000 * 60})
            }
            req.session.tempEmail = email.trim().toLowerCase();
            req.session.firstName = req.body.firstName.trim();
            req.session.lastName = req.body.lastName.trim();

            return res.render('password', {msg: ''}); // continue forward
        }
        // else, exits
        return res.render('register', {inUse: true, expired: false});


    }).catch(() => {
        return res.render('register', {inUse: true, expired: false});        // in case of error, don't add
    });


});

module.exports = router;
