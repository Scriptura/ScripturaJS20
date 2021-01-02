'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

// @example '/calendar/2020/12/06'
router.get('/calendar/:year([0-9]{1,4})/:month([0-9]{1,2})/:day([0-9]{1,2})', async (req, res, next) => {
  res.render('calendar', getCalendar)
})

module.exports = router
