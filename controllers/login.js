'use strict'

const vv = require('../settings/variables'),
      express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      { getLogin } = require('../models/login')

const username = getLogin._username

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        })
      }
      return done(null, user)
    })
  }
))

router.get('/login', (req, res, next) => { // GET home page
  res.render('login', {
    _title: 'Login | ' + vv.siteName
    , _meta_description: 'Page de connexion'
    , _name: 'Connexion'
  })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/'
    , failureRedirect: '/login'
    , failureFlash: false
    , failureFlash: true
    //, failureFlash: 'Identifiant ou mot de passe invalide.' //'Invalid username or password.'
    //, successFlash: 'Welcome!'
  })
)

module.exports = router
