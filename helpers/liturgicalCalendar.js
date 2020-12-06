'use strict'

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime, Interval } = require('luxon'),
      easterDate = require('date-easter'),
      currentDate = DateTime.local()

// @params: {object} ISO date, optional ; {string} ISO 3166-1 alpha-3 pays, optional
const liturgicalCalendar = (date = currentDate, lang = 'VAT') => {

  const data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        year = date.toFormat('yyyy'),
        month = date.toFormat('MM'),
        day = date.toFormat('dd'),
        dayMonth = day + month,
        ge = easterDate.gregorianEaster(year),
        easter = DateTime.local(ge.year, ge.month, ge.day), // Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php
        immaculateConception = DateTime.fromFormat('0812' + year, 'ddMMyyyy'),
        christmas = DateTime.fromFormat('2512' + year, 'ddMMyyyy'),
        sundayBeforeChristmas = christmas.startOf('week'),
        firstAdventSunday = sundayBeforeChristmas.plus({days: -22}),
        advent = Interval.fromDateTimes(firstAdventSunday, christmas),
        christmasOctave = Interval.fromDateTimes(christmas, christmas.plus({days: 7})), // @todo A cheval sur 2 années...
        epiphany = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week'),
        christmasSunday = DateTime.fromFormat('2512' + year, 'ddMMyyyy').endOf('week')

  let baptismOfTheLord = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week').plus({days: 7})
  if (epiphany.toFormat('dd') === ('07' || '08')) baptismOfTheLord = epiphany.plus({days: 1})

  const christmasPeriod = Interval.fromDateTimes(christmas, baptismOfTheLord.plus({years: 1})), // @todo A cheval sur 2 années...
        epiphanyPeriod = Interval.fromDateTimes(epiphany, baptismOfTheLord.plus({days: -1}))

  // @note Si une fête fixe du calendrier général devient votive dans le propre d'un pays, le .json du pays concerné mentionnera une valeur vide pour le nom en lieu et place de la date ({"name": ""}), ceci afin de permettre les traitements qui annuleront la fête.

  // Fusionner les objets :
  let data = {...data1[dayMonth], ...data2[dayMonth], ...data3[dayMonth]}


  // Initialisation des variables si pas de données ou valeurs manquantes dans les .json :
  if (typeof data.name === 'undefined' || data.name === '') data.name = "De la férie", data.color = "", data.grade = "", data.rank = ""
  if (data.color === '') data.color = ""
  if (data.grade === '') data.grade = ""
  if (data.rank === '') data.rank = ""

  // Périodes liturgiques, dénomination :
  if (advent.contains(date)) data.period = "Temps de l'Avent"
  else if (christmasOctave.contains(date)) data.period = "Octave de la Nativité du Seigneur"
  else if (epiphanyPeriod.contains(date)) data.period = "Après l'Épiphanie"
  else if (christmasPeriod.contains(date)) data.period = "Temps de Noël"
  else data.period = "Temps ordinaire"

  // Périodes liturgiques, couleur :
  if (advent.contains(date) && data.color === '') data.color = "purple"
  else if (christmasPeriod.contains(date) && data.color === '') data.color = "white"
  else if (data.color === '') data.color = "green"

  console.log(christmasOctave.contains(date))
  console.log(christmasOctave.toFormat('ddMMyyyy'))

  // Définition des fêtes votives :
  if (firstAdventSunday.hasSame(date, 'day')) data.name = "Premier dimanche de l'Avent, <em>Levavi</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (sundayBeforeChristmas.plus({days: -15}).hasSame(date, 'day')) data.name = "Deuxième dimanche de l'Avent, <em>Populus Sion</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (sundayBeforeChristmas.plus({days: -8}).hasSame(date, 'day')) data.name = "Troisième dimanche de l'Avent, <em>Gaudete</em>", data.color = "pink", data.grade = "1", data.rank = "2"
  if (sundayBeforeChristmas.plus({days: -1}).hasSame(date, 'day')) data.name = "Quatrième dimanche de l'Avent, <em>Rorate</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  // Immaculée Conception le 08/12, si dimanche alors célébration le lundi 09/12
  if (dayMonth === '0812' && immaculateConception.weekday !== 7 || dayMonth === '0912' && immaculateConception.weekday === 7) data.name = "Immaculée Conception de la Bienheureuse Vierge Marie", data.color = "white", data.grade = "1", data.rank = "3"
  // Sainte Famille le dimanche qui suit Noël, si Noël est un dimanche alors le 30/12.
  if (christmasSunday.hasSame(date, 'day') || dayMonth === '3012' && christmas.weekday === 7) data.name = "La Sainte Famille", data.color = "white", data.grade = "2", data.rank = "5"
  // Épiphanie le 06/01 pour le calendrier général, le dimanche après le premier janvier pour la France (et les autres pays qui ne chôment pas ce jour-là).
  if (epiphany.hasSame(date, 'day')) data.name = "Épiphanie du Seigneur", data.color = "white", data.grade = "1", data.rank = "2"
  // Baptême du Seigneur célébré à la place du 1er dimanche ordinaire, ou le lendemain de l'Épiphanie si celle-ci est célébrée le 7 ou 8 janvier.
  if (baptismOfTheLord.hasSame(date, 'day')) data.name = "Le Baptême du Seigneur", data.color = "white", data.grade = "3", data.rank = "5"
  if (easter.plus({days: -46}).hasSame(date, 'day')) data.name = "Mercredi des Cendres", data.color = "purple", data.grade = "", data.rank = "2"
  if (easter.plus({days: -42}).hasSame(date, 'day')) data.name = "Premier dimanche de Carême, <em>Invocabit</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -35}).hasSame(date, 'day')) data.name = "Deuxième dimanche de Carême, <em>Reminiscere</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -28}).hasSame(date, 'day')) data.name = "Troisième dimanche de Carême, <em>Oculi</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -21}).hasSame(date, 'day')) data.name = "Quatrième dimanche de Carême, <em>Laetare</em>", data.color = "pink", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -14}).hasSame(date, 'day')) data.name = "Cinquième dimanche de Carême, <em>Judica</em>", data.color = "purple", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -7}).hasSame(date, 'day')) data.name = "Dimanche des Rameaux et de la Passion du Seigneur", data.color = "red", data.grade = "1", data.rank = "2"
  if (easter.plus({days: -6}).hasSame(date, 'day')) data.name = "Lundi Saint", data.color = "purple", data.grade = "", data.rank = "2"
  if (easter.plus({days: -5}).hasSame(date, 'day')) data.name = "Mardi Saint", data.color = "purple", data.grade = "", data.rank = "2"
  if (easter.plus({days: -4}).hasSame(date, 'day')) data.name = "Mercredi Saint", data.color = "purple", data.grade = "", data.rank = "2"
  if (easter.plus({days: -3}).hasSame(date, 'day')) data.name = "Jeudi Saint", data.color = "white", data.grade = "1", data.rank = "1" // rank "2" en journée, rank "1" le soir
  if (easter.plus({days: -2}).hasSame(date, 'day')) data.name = "Vendredi Saint", data.color = "red", data.grade = "1", data.rank = "1"
  if (easter.plus({days: -1}).hasSame(date, 'day')) data.name = "Samedi Saint", data.color = "purple", data.grade = "1", data.rank = "1"
  if (easter.hasSame(date, 'day')) data.name = "Résurrection du Seigneur", data.color = "white", data.grade = "1", data.rank = "1"
  if (easter.plus({days: 1}).hasSame(date, 'day')) data.name = "Lundi dans l'octave Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 2}).hasSame(date, 'day')) data.name = "Mardi dans l'octave de Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 3}).hasSame(date, 'day')) data.name = "Mercredi dans l'octave de Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 4}).hasSame(date, 'day')) data.name = "Jeudi dans l'octave de Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 5}).hasSame(date, 'day')) data.name = "Vendredi dans l'octave de Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 6}).hasSame(date, 'day')) data.name = "Samedi dans l'octave de Pâques", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 7}).hasSame(date, 'day')) data.name = "Dimanche de la divine Miséricorde, <em>in albis</em>", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 14}).hasSame(date, 'day')) data.name = "Troisième dimanche du Temps Pascal", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 21}).hasSame(date, 'day')) data.name = "Quatrième dimanche du Temps Pascal", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 28}).hasSame(date, 'day')) data.name = "Cinquième dimanche du Temps Pascal", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 35}).hasSame(date, 'day')) data.name = "Sixième dimanche du Temps Pascal", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 40}).hasSame(date, 'day')) data.name = "Ascension", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 49}).hasSame(date, 'day')) data.name = "Pentecôte", data.color = "white", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 56}).hasSame(date, 'day')) data.name = "Sainte Trinité", data.color = "white", data.grade = "1", data.rank = "3"
  if (easter.plus({days: 63}).hasSame(date, 'day')) data.name = "Le Saint Sacrement", data.color = "white", data.grade = "1", data.rank = "3"
  if (easter.plus({days: 68}).hasSame(date, 'day')) data.name = "Sacré-Cœur de Jésus", data.color = "white", data.grade = "1", data.rank = "3"
  if (sundayBeforeChristmas.plus({days: -29}).hasSame(date, 'day')) data.name = "Notre Seigneur Jésus Christ Roi de l'Univers", data.color = "white", data.grade = "1", data.rank = "3"


// @todo :

// - Solennité de Saint Joseph, époux de la Vierge Marie : 19 mars, reporté au 20 mars si le 19 tombe un dimanche de carême, ou avancé au samedi avant les Rameaux si le 19 tombe pendant la semaine sainte.
// Si la fête tombe un dimanche, autre que le Dimanche des Rameaux, celle-ci est célébrée le jour suivant, généralement le lundi 20 mars, mais seulement si une autre solennité (par exemple, un autre Saint patron de l'Église) n'est pas célébrée durant cette journée. Depuis 2008, si le jour de la Fête de Saint Joseph tombe pendant la Semaine Sainte, la célébration de sa fête est déplacée vers le jour le plus proche possible avant le 19 mars, généralement le samedi précédant la Semaine Sainte.
// data.name = "Saint Joseph, chaste Époux de la Bienheureuse Vierge Marie", data.color = "white", data.grade = "1", data.rank = "3"

// - Solennité de l'Annonciation du Seigneur à Marie, le 25 mars. Est décalée au 26, si le 25 est un dimanche (ou le premier lundi qui suit le deuxième dimanche de Pâques si le 25 mars se situe pendant la Semaine Sainte).
// data.name = "Annonciation du Seigneur", data.color = "white", data.grade = "1", data.rank = "3"

// Jeudi de la solennité du Saint Sacrement (fête décalée au dimanche dans certaines régions, en particulier en France, ayant reçu un indult en ce sens).

// Solennité de la Nativité de Saint Jean-Baptiste : 24 juin, reporté au 25 si le 24 juin tombe le jour de la solennité du Saint-Sacrement ou du Sacré-Coeur
// data.name = "Nativité de Saint Jean-Baptiste", data.color = "white", data.grade = "1", data.rank = "3"

// Solennité de Saint Pierre et Saint Paul : 29 juin, reporté au 30 si le 29 tombe le jour de la solennité du Sacré-Coeur
// data.name = "Saints Pierre et Paul, apôtres", data.color = "red", data.grade = "1", data.rank = "3"


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


  data.displayDate = `${day}.${month}.${year}`

  //console.log(data)

  return data
}

module.exports = { liturgicalCalendar: liturgicalCalendar }
