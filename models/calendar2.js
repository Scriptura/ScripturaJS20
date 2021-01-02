'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon')

const getCalendar = async year => await year
.then(data => {
  liturgicalCalendar(DateTime.fromFormat('3012' + data, 'ddMMyyyy'))
  console.log(data)
  return data
})
.catch(error => {
  console.log(error.message || error)
  return data
})

module.exports = { getCalendar: getCalendar }
