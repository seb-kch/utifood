var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login', { message: req.flash('loginMessage')});
});

router.get('/signup', (req, res) => {
  res.render('user/signup', { message: req.flash('signupMessage')});
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('user/profile', {
    user : req.user
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();
    
    res.redirect('/')
}
module.exports = router;