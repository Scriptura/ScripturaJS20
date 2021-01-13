'use strict'

const vv = require('../settings/variables'),
      db = require('../database/db'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon')

const getCalendar = async (year, month, day) => await db.one('SELECT * FROM public.__post WHERE _id = $1', '1')
.then(data => {
  data._calendar = liturgicalCalendar(DateTime.fromFormat(day + month + year, 'ddMMyyyy'))
  //console.log(data)
  return data
})
.catch(error => {
  console.log(error.message || error)
  return data
})

module.exports = { getCalendar: getCalendar }
