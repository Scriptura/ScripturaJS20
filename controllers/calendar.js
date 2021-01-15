'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

router.get('/calendar', async (req, res, next) => { // GET '/calendar'
  const data = await getCalendar(req.params.year, req.params.month, req.params.day)
    .then(data => res.render('calendar', data))
    .catch(error => next())
})

module.exports = router
