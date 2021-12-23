var express = require('express');
var router = express.Router();

let User = require('../models/User')

router.get('/', function (req, res, next) {
  console.log("i'm in get register")
  res.render('register');

});

router.post('/', function (req, res, next) {
  console.log("i'm in post register")


  const isExists = function (email){
    for (const user of User.fetchAll()) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  const email = req.body.email.trim();


  const duplicate = isExists(email)
  if (!duplicate) {
    let user = new User(req.body.email.trim(),
        req.body.firstName.trim(),
        req.body.lastName.trim())
    user.save()

  }
  console.log("after", User.fetchAll())

  res.render('register');



});


module.exports = router;

