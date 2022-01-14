var express = require('express');
var router = express.Router();

let User = require('../models/User')

router.get('/', function (req, res, next) {
  console.log("i'm in get register")
  return res.render('register', {filledEmailAndNames : false, data : {}});

});
router.post('/', function (req, res, next) {
  const isExists = function (email){
    for (const user of User.getAllUsers()) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }
  console.log("in post of register")
  const email = req.body.email.trim();

  const duplicate = isExists(email)
  if (!duplicate) { // a new user, need to save
    let user = new User(req.body.email.trim(),
        req.body.firstName.trim(),
        req.body.lastName.trim())
    user.save()
  }

  return res.render('register',
      {filledEmailAndNames : !duplicate,// a new user -> proceed
        data : User.getAllUsers()});
});


module.exports = router;

