'use strict'

const vv = require('../settings/variables'),
      express = require('express'),
      router = express.Router(),
      //argon2 = require('argon2'),
      { postUser } = require('../models/user')

router.get('/register', (req, res, next) => {
  res.render('register', {
    _title: 'Inscription | ' + vv.siteName
    , _description: 'Page d\'enregistrement des utilisateurs'
    , _name: 'Inscription'
  })
})

router.post('/register', async (req, res, next) => {
  const data = await postUser(req.body.username,req.body.password)
    .then(data => {
      //res.send({}) ?
    })
    .catch(error => {
      console.log(error)
      next()
    })
})

module.exports = router
