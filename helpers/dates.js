'use strict'

const { DateTime } = require('luxon')

// @see https://moment.github.io/luxon/docs/manual/formatting
// @see https://moment.github.io/luxon/demo/global.html

const dateFormat = (date) => {
  return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')
}

const dateTimeFormat = (date) => {
  return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy HH:mm')
  //return DateTime.fromJSDate(date).setLocale('fr').toLocaleString(DateTime.DATE_FULL)
}

module.exports = {
  dateFormat: dateFormat,
  dateTimeFormat: dateTimeFormat
}
