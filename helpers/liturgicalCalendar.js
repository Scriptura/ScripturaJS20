'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime } = require('luxon'),
      easter = require('date-easter')

// @param {string} 'ddMM' ; default: current date
// Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php

const liturgicalCalendar = date => {
  const data1 = JSON.parse(fs.readFileSync(french, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(general, 'utf8')),
        dt = DateTime.local(),
        currentYear = dt.toFormat('yyyy'),
        currentDayMonth = dt.toFormat('ddMM'),
        ge = easter.gregorianEaster(currentYear),
        easterDate = DateTime.local(ge.year, ge.month, ge.day),
        currentEasterM46 = easterDate.plus({ days: -46 }).toFormat('ddMM'),
        currentEasterM4 = easterDate.plus({ days: -4 }).toFormat('ddMM'),
        currentEasterM3 = easterDate.plus({ days: -3 }).toFormat('ddMM'),
        currentEasterM2 = easterDate.plus({ days: -2 }).toFormat('ddMM'),
        currentEasterM1 = easterDate.plus({ days: -1 }).toFormat('ddMM'),
        currentEaster = easterDate.toFormat('ddMM'),
        currentEasterP1 = easterDate.plus({ days: 1 }).toFormat('ddMM'),
        currentEasterP2 = easterDate.plus({ days: 2 }).toFormat('ddMM'),
        currentEasterP3 = easterDate.plus({ days: 3 }).toFormat('ddMM'),
        currentEasterP4 = easterDate.plus({ days: 4 }).toFormat('ddMM'),
        currentEasterP5 = easterDate.plus({ days: 5 }).toFormat('ddMM'),
        currentEasterP6 = easterDate.plus({ days: 6 }).toFormat('ddMM'),
        currentEasterP7 = easterDate.plus({ days: 7 }).toFormat('ddMM'),
        currentEasterP40 = easterDate.plus({ days: 39 }).toFormat('ddMM'),
        currentEasterP49 = easterDate.plus({ days: 49 }).toFormat('ddMM'),
        currentEasterP56 = easterDate.plus({ days: 56 }).toFormat('ddMM'),
        currentEasterP68 = easterDate.plus({ days: 68 }).toFormat('ddMM')

  // Gestion des fêtes votives
  if (typeof date === 'undefined') date = currentDayMonth
  let result = data1[date]
  result = data2[date]
  result = data3[date]
  if (typeof result === 'undefined') result = {name: 'De la férie'}
  if (currentDayMonth === currentEasterM46) result = {name: "Mercredi des Cendres"}
  if (currentDayMonth === currentEasterM4) result = {name: "Mercredi Saint"}
  if (currentDayMonth === currentEasterM3) result = {name: "Jeudi Saint"}
  if (currentDayMonth === currentEasterM2) result = {name: "Vendredi Saint"}
  if (currentDayMonth === currentEasterM1) result = {name: "Samedi Saint", rank: "1"}
  if (currentDayMonth === currentEaster) result = {name: "Résurrection du Seigneur", rank: "1"}
  if (currentDayMonth === currentEasterP1) result = {name: "Lundi de l'octave Pâques"}
  if (currentDayMonth === currentEasterP2) result = {name: "Mardi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP3) result = {name: "Mercredi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP4) result = {name: "Jeudi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP5) result = {name: "Vendredi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP6) result = {name: "Samedi de l'octave de Pâques"}
  if (currentDayMonth === currentEasterP7) result = {name: "Dimanche de la divine Miséricorde", rank: "1"}
  if (currentDayMonth === currentEasterP40) result = {name: "Ascension", rank: "1"}
  if (currentDayMonth === currentEasterP49) result = {name: "Pentecôte", rank: "1"}
  if (currentDayMonth === currentEasterP56) result = {name: "Sainte Trinité", rank: "1"}
  //if (currentDayMonth === currentEasterP56) result = {name: "Très Saints Corps et Sang du Christ (Corpus Christi)", rank: "1"}
  if (currentDayMonth === currentEasterP68) result = {name: "Sacré-Cœur de Jésus", rank: "1"}
  //result = {name: "Christ Roi", rank: "1"}

// Epiphanie, Sainte Famille...
/* si dimanche, alors célébration le lundi 9 :
  "0812": {
    "name": "Immaculée Conception de la Bienheureuse Vierge Marie",
    "color": "white",
    "rank": "1"
  }
*/



  // Traducion des degrés de fête numérotés en language humain
  let rank = result.rank
  if (rank === '1') result.rank = 'Solennité'
  if (rank === '2') result.rank = 'Fête'
  if (rank === '3') result.rank = 'Mémoire obligatoire'
  if (rank === '4') result.rank = 'Mémoire facultative'

  // Gestion des couleurs liturgiques
  let color = result.color
  if (typeof result.color === 'undefined') result.color = '#777'
  if (color === 'withe') result.color = '#ffffff'
  if (color === 'red') result.color = '#ff0000' //'#bf2329'
  if (color === 'purple') result.color = '#800080'
  if (color === 'black') result.color = '#000000'

  let color2 = result.color2
  if (typeof result.color2 === 'undefined') result.color2 = '#777'
  if (color2 === 'withe') result.color2 = '#ffffff'
  if (color2 === 'red') result.color2 = '#ff0000' //'#bf2329'
  if (color2 === 'purple') result.color2 = '#800080'
  if (color2 === 'black') result.color2 = '#000000'

  return result
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
