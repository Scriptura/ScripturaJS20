'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

router.get('/calendar', (req, res, next) => { // GET home page
  res.render('calendar', getCalendar)
})

module.exports = router
