'use strict'

const vv = require('../settings/variables'),
      //db = require('../database'),
      express = require('express'),
      router = express.Router()

router.get('/', (req, res, next) => { // GET home page
  res.render('index', {
    _title: vv.siteName
    , _meta_description: vv.siteName + ', page d\'accueil'
    , _name: vv.siteName
  })
})

module.exports = router
