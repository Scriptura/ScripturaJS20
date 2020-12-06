'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

router.get('/calendar/:year([0-9]{1,4})/:month([0-9]{1,2})/:day([0-9]{1,2})', async (req, res, next) => { // @example '/calendar/2020/12/06'
  //const data = await getCalendar(req.params.day + req.params.month + req.params.year, 'ddMMyyyy')
  res.render('calendar', getCalendar)
})

module.exports = router
