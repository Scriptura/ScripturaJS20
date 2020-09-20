'use strict'

const fs = require('fs'),
      json = './data/liturgicalCalendar.json',
      { DateTime } = require('luxon')

let data = JSON.parse(fs.readFileSync(json, 'utf8')),
    date = DateTime.local().setLocale('fr').toFormat('ddMM'),
    result = data[date]
//console.log(date)
if (result === undefined) result = ''
const liturgicalCalendar = result

module.exports = { liturgicalCalendar: liturgicalCalendar }
