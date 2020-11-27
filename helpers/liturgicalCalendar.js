'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime } = require('luxon'),
      easter = require('date-easter'),
      currentDayMonth = DateTime.local().toFormat('ddMM'),
      currentYear = DateTime.local().toFormat('yyyy')

// @params: {string} 'ddMM' optional; {string} 'yyyy' optional ; default: current date

const liturgicalCalendar = (dayMonth = currentDayMonth, year = currentYear) => {

  const data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        ge = easter.gregorianEaster(year),
        easterDate = DateTime.local(ge.year, ge.month, ge.day), // Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php
        immaculateConceptionDay = DateTime.fromFormat('0812' + year, 'ddMMyyyy').weekday,
        sundayBeforeChristmas = DateTime.fromFormat('2512', 'ddMM').startOf('week'),
        christmasSunday = DateTime.fromFormat('2512' + year, 'ddMMyyyy').endOf('week').toFormat('ddMM'),
        christmasDay = DateTime.fromFormat('2512' + year, 'ddMMyyyy').weekday,
        epiphany = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week').toFormat('ddMM')

  // Fusionner les objets :
  let data = {...data1[dayMonth], ...data2[dayMonth], ...data3[dayMonth]}

  // @note Si une fête fixe du calendrier général devient votive dans le propre d'un pays, le .json du pays concerné mentionnera une valeur vide pour le nom en lieu et place de la date ({"name": ""}), ceci afin de permettre les traitements qui annuleront la fête.

  // Si pas de données dans les .json ou valeurs manquantes :
  if (typeof data.name === 'undefined' || data.name === '') data = {name: "De la férie", color: "", grade: "", rank: ""}
  if (data.color === '') data.color = "green"
  if (data.grade === '') data.grade = ""
  if (data.rank === '') data.rank = ""

  // Définition des fêtes votives :
  if (dayMonth === easterDate.plus({days: -46}).toFormat('ddMM')) data = {name: "Mercredi des Cendres", color: "purple", grade: "", rank: "2"}
  if (dayMonth === easterDate.plus({days: -42}).toFormat('ddMM')) data = {name: "Premier dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -35}).toFormat('ddMM')) data = {name: "Deuxième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -28}).toFormat('ddMM')) data = {name: "Troisième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -21}).toFormat('ddMM')) data = {name: "Quatrième dimanche de Carême, <em>Laetare</em>", color: "pink", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -14}).toFormat('ddMM')) data = {name: "Cinquième dimanche de Carême", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -7}).toFormat('ddMM')) data = {name: "Dimanche des Rameaux et de la Passion du Seigneur", color: "red", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: -6}).toFormat('ddMM')) data = {name: "Lundi Saint", color: "purple", grade: "", rank: "2"}
  if (dayMonth === easterDate.plus({days: -5}).toFormat('ddMM')) data = {name: "Mardi Saint", color: "purple", grade: "", rank: "2"}
  if (dayMonth === easterDate.plus({days: -4}).toFormat('ddMM')) data = {name: "Mercredi Saint", color: "purple", grade: "", rank: "2"}
  if (dayMonth === easterDate.plus({days: -3}).toFormat('ddMM')) data = {name: "Jeudi Saint", color: "white", grade: "1", rank: "1"} // rank "1" seulement pour le soir, sinon rank "2"
  if (dayMonth === easterDate.plus({days: -2}).toFormat('ddMM')) data = {name: "Vendredi Saint", color: "red", grade: "1", rank: "1"}
  if (dayMonth === easterDate.plus({days: -1}).toFormat('ddMM')) data = {name: "Samedi Saint", color: "purple", grade: "1", rank: "1"}
  if (dayMonth === easterDate.toFormat('ddMM')) data = {name: "Résurrection du Seigneur", color: "white", grade: "1", rank: "1"}
  if (dayMonth === easterDate.plus({days: 1}).toFormat('ddMM')) data = {name: "Lundi dans l'octave Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 2}).toFormat('ddMM')) data = {name: "Mardi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 3}).toFormat('ddMM')) data = {name: "Mercredi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 4}).toFormat('ddMM')) data = {name: "Jeudi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 5}).toFormat('ddMM')) data = {name: "Vendredi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 6}).toFormat('ddMM')) data = {name: "Samedi dans l'octave de Pâques", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 7}).toFormat('ddMM')) data = {name: "Dimanche de la divine Miséricorde", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 14}).toFormat('ddMM')) data = {name: "Troisième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 21}).toFormat('ddMM')) data = {name: "Quatrième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 28}).toFormat('ddMM')) data = {name: "Cinquième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 35}).toFormat('ddMM')) data = {name: "Sixième dimanche du Temps Pascal", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 40}).toFormat('ddMM')) data = {name: "Ascension", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 49}).toFormat('ddMM')) data = {name: "Pentecôte", color: "white", grade: "1", rank: "2"}
  if (dayMonth === easterDate.plus({days: 56}).toFormat('ddMM')) data = {name: "Sainte Trinité", color: "white", grade: "1", rank: "3"}
  if (dayMonth === easterDate.plus({days: 63}).toFormat('ddMM')) data = {name: "Le Saint Sacrement", color: "white", grade: "1", rank: "3"}
  if (dayMonth === easterDate.plus({days: 68}).toFormat('ddMM')) data = {name: "Sacré-Cœur de Jésus", color: "white", grade: "1", rank: "3"}

  if (dayMonth === sundayBeforeChristmas.plus({days: -29}).toFormat('ddMM')) data = {name: "Notre Seigneur Jésus Christ Roi de l'Univers", color: "white", grade: "1", rank: "3"}
  if (dayMonth === sundayBeforeChristmas.plus({days: -22}).toFormat('ddMM')) data = {name: "Premier dimanche de l'Avent", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === sundayBeforeChristmas.plus({days: -15}).toFormat('ddMM')) data = {name: "Deuxième dimanche de l'Avent", color: "purple", grade: "1", rank: "2"}
  if (dayMonth === sundayBeforeChristmas.plus({days: -8}).toFormat('ddMM')) data = {name: "Troisième dimanche de l'Avent, <em>Gaudete</em>", color: "pink", grade: "1", rank: "2"}
  if (dayMonth === sundayBeforeChristmas.plus({days: -1}).toFormat('ddMM')) data = {name: "Quatrième dimanche de l'Avent", color: "purple", grade: "1", rank: "2"}

// Immaculée Conception : si le 08/12 est un dimanche, alors célébration le lundi 09/12
if (dayMonth === '0812' && immaculateConceptionDay !== 7 || dayMonth === '0912' && immaculateConceptionDay === 7) data = {name: "Immaculée Conception de la Bienheureuse Vierge Marie", color: "white", grade: "1", rank: "3"}

// Sainte Famille : le dimanche qui suit Noël, si Noël est un dimanche alors le 30/12.
if (dayMonth === christmasSunday || dayMonth === '3012' && christmasDay === 7) data = {name: "La Sainte Famille", color: "white", grade: "2", rank: "5"}

// Épiphanie : le 06/01 pour le calendrier général, le dimanche après le premier janvier pour la France (et les autres pays qui ne chôment pas ce jour-là).
if (dayMonth === epiphany) data = {name: "Épiphanie du Seigneur", color: "white", grade: "1", rank: "2"}

const baptismOfTheLord = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week').plus({days: 7}).toFormat('ddMM')
console.log('epiphany: ' + epiphany)
if (dayMonth === baptismOfTheLord && epiphany !== ('0701' || '0801')) data = {name: "Le Baptême du Seigneur", color: "white", grade: "3", rank: "5"}

  // Traducion des degrés de fête en language humain
  let grade = data.grade
  //if (grade === '') data.grade = ""
  if (grade === '1') data.grade = "Solennité"
  if (grade === '2') data.grade = "Fête"
  if (grade === '3') data.grade = "Mémoire obligatoire"
  if (grade === '4') data.grade = "Mémoire facultative"

  // Calibrage des couleurs liturgiques
  let color = data.color
  if (color === 'withe') data.color = '#ffffff'
  if (color === 'red') data.color = '#ff0000' // #bf2329
  if (color === 'green') data.color = 'green' // #1e883f
  if (color === 'purple') data.color = '#800080' // #9f15a7
  if (color === 'pink') data.color = '#ff69b4' // hotpink
  if (color === 'black') data.color = '#000000'

  let color2 = data.color2
  if (color2 === 'withe') data.color2 = '#ffffff'
  if (color2 === 'red') data.color2 = '#ff0000' // #bf2329
  if (color2 === 'green') data.color2 = 'green' // #1e883f
  if (color2 === 'purple') data.color2 = '#800080' // #9f15a7
  if (color2 === 'pink') data.color = '#ff69b4' // hotpink
  if (color2 === 'black') data.color2 = '#000000'

  data.displayDate = `${dayMonth.substring(0, 2)}/${dayMonth.substring(2, 5)}/${year}`

  console.log(data)
  return data
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
