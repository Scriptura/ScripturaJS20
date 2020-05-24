'use strict'

const moment = require('moment')
moment.locale('fr')

// https://momentjs.com/docs/#/displaying/format/

const dateFormat = (date) => {
  return moment(date).format('L') // dd/mm/yyyy
}

const dateTimeFormat = (date) => {
  return moment(date).format('L HH:mm') // dd/mm/yyyy hh:mm
}

module.exports = {
  dateFormat: dateFormat,
  dateTimeFormat: dateTimeFormat
}
