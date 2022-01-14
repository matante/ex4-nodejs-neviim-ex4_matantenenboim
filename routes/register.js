var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.email){
    return res.render('home', {firstName:req.session.firstName, lastName: req.session.lastName});
  }
  return res.render('register', { inUse: false, expired: false });
});

module.exports = router;
