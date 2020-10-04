'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime } = require('luxon'),
      easter = require('date-easter')

// @param 'ddMM' ; default: current
// Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php

const liturgicalCalendar = date => {
  const data1 = JSON.parse(fs.readFileSync(french, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(general, 'utf8')),
        dt = DateTime.local(),
        currentYear = dt.toFormat('yyyy'),
        currentDayMonth = dt.toFormat('ddMM'), // parseInt('2602', 10),
        ge = easter.gregorianEaster(currentYear),
        easterDate = DateTime.local(ge.year, ge.month, ge.day),
        currentEasterM46 = parseInt(easterDate.plus({ days: -46 }).toFormat('ddMM'), 10),
        currentEasterM4 = parseInt(easterDate.plus({ days: -4 }).toFormat('ddMM'), 10),
        currentEasterM3 = parseInt(easterDate.plus({ days: -3 }).toFormat('ddMM'), 10),
        currentEasterM2 = parseInt(easterDate.plus({ days: -2 }).toFormat('ddMM'), 10),
        currentEasterM1 = parseInt(easterDate.plus({ days: -1 }).toFormat('ddMM'), 10),
        currentEaster = parseInt(easterDate.toFormat('ddMM'), 10),
        currentEasterP1 = parseInt(easterDate.plus({ days: 1 }).toFormat('ddMM'), 10),
        currentEasterP2 = parseInt(easterDate.plus({ days: 2 }).toFormat('ddMM'), 10),
        currentEasterP3 = parseInt(easterDate.plus({ days: 3 }).toFormat('ddMM'), 10),
        currentEasterP4 = parseInt(easterDate.plus({ days: 4 }).toFormat('ddMM'), 10),
        currentEasterP5 = parseInt(easterDate.plus({ days: 5 }).toFormat('ddMM'), 10),
        currentEasterP6 = parseInt(easterDate.plus({ days: 6 }).toFormat('ddMM'), 10),
        currentEasterP7 = parseInt(easterDate.plus({ days: 7 }).toFormat('ddMM'), 10),
        currentEasterP49 = parseInt(easterDate.plus({ days: 49 }).toFormat('ddMM'), 10)

  if (typeof date === 'undefined') date = currentDayMonth
  let result = data1[date]
  result = data2[date]
  result = data3[date]
  if (typeof result === 'undefined') result = {name: 'De la férie'}
  if (currentDayMonth === currentEasterM46) result = {name: "Mercredi des Cendres"}
  if (currentDayMonth === currentEasterM4) result = {name: "Mercredi Saint"}
  if (currentDayMonth === currentEasterM3) result = {name: "Jeudi Saint"}
  if (currentDayMonth === currentEasterM2) result = {name: "Vendredi Saint"}
  if (currentDayMonth === currentEasterM1) result = {name: "Samedi Saint"}
  if (currentDayMonth === currentEaster) result = {name: "Résurrection du Seigneur"}
  if (currentDayMonth === currentEasterP1) result = {name: "Lundi de l'octave Pâques"}
  if (currentDayMonth === currentEasterP2) result = {name: "Mardi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP3) result = {name: "Mercredi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP4) result = {name: "Jeudi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP5) result = {name: "Vendredi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP6) result = {name: "Samedi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP7) result = {name: "Dimanche de la divine Miséricorde"}
  if (currentDayMonth === currentEasterP49) result = {name: "Pentecôte"}
  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
