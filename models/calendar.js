'use strict'

const vv = require('../settings/variables'),
      db = require('../database/db'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon')

const getCalendar = async (year, month, day) => await db.one('SELECT * FROM public.__post WHERE _id = $1', '1')
.then(data => {
  const date = [day, month, year]
  const lc = liturgicalCalendar(DateTime.fromFormat(day + month + year, 'ddMMyyyy'), 'france')
  data._title = `Le ${date.join('.')} | ${vv.siteName}`
  data._description = `Date du ${date.join('/')}, ${lc.name}, ${lc.type.toLowerCase()}`
  data._calendar = lc
  data._moonPhase = moonPhase
  //console.log(data)
  return data
})
.catch(error => {
  console.log(error.message || error)
  return todo
})

module.exports = { getCalendar: getCalendar }
