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
  const data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        dt = DateTime.local(),
        currentYear = dt.toFormat('yyyy'),
        //currentDayMonth = dt.toFormat('ddMM'),
        ge = easter.gregorianEaster(currentYear),
        easterDate = DateTime.local(ge.year, ge.month, ge.day)

  let currentDayMonth = dt.toFormat('ddMM')
  // for test:
  currentDayMonth = '0601'

  if (typeof date === 'undefined') date = currentDayMonth

  let data = data1[date]
  if ((typeof data2 === 'object') && (data2[date])) data = data2[date]
  if ((typeof data3 === 'object') && (data3[date])) data = data3[date]

  if ((typeof data === 'undefined') || (data.name === '')) data = {name: "De la férie", color: "", grade: "", rank: ""}

  // Si valeurs suivantes manquantes dans les .json :
  if (data.color === '') data.color = "green"
  if (data.grade === '') data.grade = ""
  if (data.rank === '') data.rank = ""

  // Définition des fêtes votives :
  if (currentDayMonth === easterDate.plus({ days: -46 }).toFormat('ddMM')) data = {name: "Mercredi des Cendres", color: "purple", grade: "", rank: "2"} // @todo Solennité ?
  if (currentDayMonth === easterDate.plus({ days: -42 }).toFormat('ddMM')) data = {name: "Premier dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -35 }).toFormat('ddMM')) data = {name: "Deuxième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -28 }).toFormat('ddMM')) data = {name: "Troisième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -21 }).toFormat('ddMM')) data = {name: "Quatrième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -14 }).toFormat('ddMM')) data = {name: "Cinquième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -7 }).toFormat('ddMM')) data = {name: "Dimanche des Rameaux et de la Passion du Seigneur", color: "red", grade: "2", rank: ""}
  if (currentDayMonth === easterDate.plus({ days: -6 }).toFormat('ddMM')) data = {name: "Lundi Saint", color: "purple", grade: "", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -5 }).toFormat('ddMM')) data = {name: "Mardi Saint", color: "purple", grade: "", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -4 }).toFormat('ddMM')) data = {name: "Mercredi Saint", color: "purple", grade: "", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: -3 }).toFormat('ddMM')) data = {name: "Jeudi Saint", color: "white", grade: "1", rank: "1"} // rank "1" seulement pour le soir, sinon rank "2"
  if (currentDayMonth === easterDate.plus({ days: -2 }).toFormat('ddMM')) data = {name: "Vendredi Saint", color: "red", grade: "1", rank: "1"}
  if (currentDayMonth === easterDate.plus({ days: -1 }).toFormat('ddMM')) data = {name: "Samedi Saint", color: "purple", grade: "1", rank: "1"}
  if (currentDayMonth === easterDate.toFormat('ddMM')) data = {name: "Résurrection du Seigneur", color: "white", grade: "1", rank: "1"}
  if (currentDayMonth === easterDate.plus({ days: 1 }).toFormat('ddMM')) data = {name: "Lundi dans l'octave Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 2 }).toFormat('ddMM')) data = {name: "Mardi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 3 }).toFormat('ddMM')) data = {name: "Mercredi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 4 }).toFormat('ddMM')) data = {name: "Jeudi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 5 }).toFormat('ddMM')) data = {name: "Vendredi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 6 }).toFormat('ddMM')) data = {name: "Samedi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 7 }).toFormat('ddMM')) data = {name: "Dimanche de la divine Miséricorde", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 14 }).toFormat('ddMM')) data = {name: "Troisième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 21 }).toFormat('ddMM')) data = {name: "Quatrième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 28 }).toFormat('ddMM')) data = {name: "Cinquième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 35 }).toFormat('ddMM')) data = {name: "Sixième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 40 }).toFormat('ddMM')) data = {name: "Ascension", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 49 }).toFormat('ddMM')) data = {name: "Pentecôte", color: "white", grade: "1", rank: "2"}
  if (currentDayMonth === easterDate.plus({ days: 56 }).toFormat('ddMM')) data = {name: "Sainte Trinité", color: "white", grade: "1", rank: "3"}
  if (currentDayMonth === easterDate.plus({ days: 63 }).toFormat('ddMM')) data = {name: "Le Saint Sacrement", color: "white", grade: "1", rank: "3"}
  if (currentDayMonth === easterDate.plus({ days: 68 }).toFormat('ddMM')) data = {name: "Sacré-Cœur de Jésus", color: "white", grade: "1", rank: "3"}

  //{name: "Christ Roi", color: "white", grade: "1", rank: "3"}
  //{name: "Premier dimanche de l'Avent", color: "white", grade: "1", rank: "2"}
  //{name: "Deuxième dimanche de l'Avent", color: "white", grade: "1", rank: "2"}
  //{name: "Troisième dimanche de l'Avent", color: "white", grade: "1", rank: "2"}
  //{name: "Quatrième dimanche de l'Avent", color: "white", grade: "1", rank: "2"}
  //{name: "Cinquième dimanche de l'Avent", color: "white", grade: "1", rank: "2"}

//{"name": "L'Épiphanie du Seigneur", "color": "white", "grade": "1", rank: "3"} //célémonie votive pour la France sur un dimanche, le 6/01 pour d'autres pays
//{"name": "Le Baptême du Seigneur", "color": "white", "grade": "3", rank: "5"}
//Sainte Famille
/* si dimanche, alors célébration le lundi 9 :
  "0812": {
    "name": "Immaculée Conception de la Bienheureuse Vierge Marie",
    "color": "white",
    "grade": "1"
  }
*/

  // Traducion des degrés de fête en language humain
  let grade = data.grades
  //if (grade === '') data.grade = ""
  if (grade === '1') data.grade = "Solennité"
  if (grade === '2') data.grade = "Fête"
  if (grade === '3') data.grade = "Mémoire obligatoire"
  if (grade === '4') data.grade = "Mémoire facultative"

  // Calibrage des couleurs liturgiques
  let color = data.color
  if (color === 'withe') data.color = '#ffffff'
  if (color === 'red') data.color = '#ff0000' //#bf2329
  if (color === 'green') data.color = 'green' //#1e883f
  if (color === 'purple') data.color = '#800080' //#9f15a7
  if (color === 'black') data.color = '#000000'

  let color2 = data.color2
  if (color2 === 'withe') data.color2 = '#ffffff'
  if (color2 === 'red') data.color2 = '#ff0000' //#bf2329
  if (color2 === 'green') data.color2 = 'green' //#1e883f
  if (color2 === 'purple') data.color2 = '#800080' //#9f15a7
  if (color2 === 'black') data.color2 = '#000000'

  return data
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
