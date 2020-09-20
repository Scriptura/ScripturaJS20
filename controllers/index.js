'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar')

router.get('/', (req, res, next) => { // GET home page
  res.render('index', {
    _title: vv.siteName
    , _name: vv.siteName
    , _description: vv.siteName + ', page d\'accueil'
    , _calendar: liturgicalCalendar.name
  })
})

module.exports = router
