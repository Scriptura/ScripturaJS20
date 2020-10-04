'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime } = require('luxon'),
      { gregorian, julian } = require('../helpers/computus')

// @param 'ddMM' ; default: current

const liturgicalCalendar = date => {
  const data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        dt = DateTime.local(),
        currentYear = dt.toFormat('yyyy'),
        currentDate = 1204, //dt.toFormat('ddMM')
        currentEaster = gregorian(currentYear)
  if (typeof date === 'undefined') date = currentDate
  let result = data1[date]
  result = data2[date]
  result = data3[date]
  if (typeof result === 'undefined') result = {name: 'De la férie'}
  if (currentDate == currentEaster) result = {name: 'Pâques'}
  //if (currentDate == currentEaster) result = {name: 'Lundi de Pâques'}
  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
