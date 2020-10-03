'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime } = require('luxon'),
      { gregorian } = require('../helpers/computus')

console.log(
  gregorian(1918)
)

const liturgicalCalendar = date => { // @param 'ddMM' ; default: current
  const data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        currentDate = DateTime.local().toFormat('ddMM')
  if (typeof date === 'undefined') date = currentDate
  let result = data1[date]
  result = data2[date]
  result = data3[date]
  if (typeof result === 'undefined') result = {name: 'De la férie'}
  //console.log(date)
  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
