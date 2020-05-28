'use strict'

const vv = require('../settings/variables'),
      express = require('express'),
      router = express.Router()

router.get('/', (req, res, next) => { // GET home page
  res.render('index', {
    _title: vv.siteName
    , _name: vv.siteName
    , _description: vv.siteName + ', page d\'accueil'
  })
})

module.exports = router
