'use strict'

const fs = require('fs'),
      json = './data/json/liturgicalCalendar.json',
      { DateTime } = require('luxon')

const liturgicalCalendar = date => { // @param 'JJMM' ; default: current
  const data = JSON.parse(fs.readFileSync(json, 'utf8')),
        currentDate = DateTime.local().toFormat('ddMM')
  if (date === undefined) date = currentDate
  let result = data[date]
  if (result === undefined) result = {name: 'No data'}
  //console.log(date)
  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
