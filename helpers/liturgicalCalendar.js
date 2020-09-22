'use strict'

const fs = require('fs'),
      json = './data/json/liturgicalCalendar.json',
      { DateTime } = require('luxon')

const liturgicalCalendar = date => {
  if (date === undefined) date = DateTime.local().toFormat('ddMM')
  const data = JSON.parse(fs.readFileSync(json, 'utf8')),
  result = data[date]
  if (result === undefined) result = {name: 'No data'}
  //console.log(date)
  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
