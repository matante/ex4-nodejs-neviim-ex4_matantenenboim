var express = require('express');
var router = express.Router();

let User = require('../models/User')

/* GET home page. */
router.post('/users', function (req, res, next) {

    const email = req.body

    let found = false;
    for (let user of User.getAllUsers()){
        if (user.email === email){
            found = true;
            break;
        }
    }
    return res.json({found: found})

});


router.get('/users/:mail', function (req, res, next) {


    const email = req.params.mail;
    let found = false;

    for (let user of User.getAllUsers()){
        if (user.email === email){
            found = true;
            break;
        }
    }
    return res.json({found: found})

});


module.exports = router;

