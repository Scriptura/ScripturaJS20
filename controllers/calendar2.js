'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

// @example '/calendar/2020/12/06'
router.get('/calendar/:year([0-9]{1,4})', async (req, res, next) => {
const data = await getCalendar(req.params.year)
  .then(data => res.render('calendar', data))
  .catch(error => {
    console.log(error)
    next()
  })
})

module.exports = router
