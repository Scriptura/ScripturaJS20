'use strict'

const { DateTime } = require('luxon')

// @see https://moment.github.io/luxon/demo/global.html

const dateFormat = (date) => {
  return DateTime.fromJSDate(date).setLocale('fr').toFormat('dd/MM/yyyy')
}

const dateTimeFormat = (date) => {
  return DateTime.fromJSDate(date).setLocale('fr').toFormat('dd/MM/yyyy HH:mm')
}

module.exports = {
  dateFormat: dateFormat,
  dateTimeFormat: dateTimeFormat
}
