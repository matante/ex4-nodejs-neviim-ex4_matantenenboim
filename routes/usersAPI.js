var express = require('express');
var router = express.Router();

let User = require('../models/User')

/* GET home page. */
router.post('/users', function (req, res, next) {

    const email = req.body


    for (let user of User.fetchAll()){
        if (user.email === email){
            res.json({found: true})
        }
    }
    res.json({found: false})

});


router.get('/users/:mail', function (req, res, next) {


    const email = req.params.mail

    // let user = new User("matante@edu.hac.ac.il",
    //     "matan",
    //     "tenen")
    // user.save()
    //
    // console.log(User.fetchAll())

    for (let user of User.fetchAll()){
        if (user.email === email){
            res.json({found: true})
        }
    }
    res.json({found: false})

});
//
// router.get('/users', function (req, res, next) {
//
// });

module.exports = router;

