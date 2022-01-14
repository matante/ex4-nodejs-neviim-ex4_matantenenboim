"use strict";
var express = require('express');
var router = express.Router();

/**
 * display register page
 */
router.get('/', function (req, res) {
    return (req.session.email) ?
        res.render('home', {firstName: req.session.firstName, lastName: req.session.lastName})
        :
        res.render('register', {inUse: false, expired: false});

});

module.exports = router;
