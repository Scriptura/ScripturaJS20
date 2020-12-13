'use strict'

const e = require('express')

const fs = require('fs'),
      general = './data/json/generalRomanCalendar.json',
      european = './data/json/europeanRomanCalendar.json',
      french = './data/json/frenchRomanCalendar.json',
      { DateTime, Interval } = require('luxon'),
      easterDate = require('date-easter'),
      currentDate = DateTime.local()

/**
 * @param {object} ISO date, optional
 * @param {string} ISO 3166-1 alpha-3 pays, optional
*/
const liturgicalCalendar = (date = currentDate, lang = 'VAT') => {

  /**
   * Vérification @see https://www.aelf.org/calendrier/romain/2020/01
   * La préséance est déterminée par une valeur rank dans les fichiers .json, mais dans la pratique le calendrier romain sert de base et ses valeurs peuvent être écrasées par les propres qui sont chargés après lui, sans besoin de calcul logiciel.
   * Si une fête fixe du calendrier général devient votive dans le propre d'un pays, le .json du pays concerné mentionnera une valeur vide pour le nom en lieu et place de la date ({"name": ""}), ceci afin de permettre les traitements qui annuleront la fête, la fête votive sera au final déterminée par calcul logiciel.
   * 1. Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php
   * 2. Immaculée Conception le 08/12, si dimanche alors célébration le lundi 09/12.
   * 3. Sainte Famille le dimanche qui suit Noël, si Noël est un dimanche alors le 30/12.
   * 4. Épiphanie le 06/01 pour le calendrier général, le dimanche après le premier janvier pour la France et les autres pays qui ne chôment pas ce jour-là.
   * 5. Baptême du Seigneur célébré à la place du 1er dimanche ordinaire, ou le lendemain de l'Épiphanie si celle-ci est célébrée le 7 ou 8 janvier.
   * 6. Période de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année en cours.
   * 7. Octave de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année en cours.
   * 8. Solennité de Saint Pierre et Saint Paul : 29 juin, reporté au 30 si le 29 tombe le jour de la solennité du Sacré-Coeur.
   * 9. Si la fête tombe un dimanche, autre que le Dimanche des Rameaux, celle-ci est célébrée le jour suivant, généralement le lundi 20 mars, mais seulement si une autre solennité (par exemple, un autre Saint patron de l'Église) n'est pas célébrée durant cette journée. Depuis 2008, si le jour de la Fête de Saint Joseph tombe pendant la Semaine Sainte, la célébration de sa fête est déplacée vers le jour le plus proche possible avant le 19 mars, généralement le samedi précédant la Semaine Sainte.
  */

  const year = date.toFormat('yyyy'),
        month = date.toFormat('MM'),
        day = date.toFormat('dd'),
        dayMonth = day + month,
        // Chargement des .json et fusion des données :
        data1 = JSON.parse(fs.readFileSync(general, 'utf8')),
        data2 = JSON.parse(fs.readFileSync(european, 'utf8')),
        data3 = JSON.parse(fs.readFileSync(french, 'utf8')),
        data = {...data1[dayMonth], ...data2[dayMonth], ...data3[dayMonth]},
        // Variables pour les fêtes votives :
        ge = easterDate.gregorianEaster(year),
        christmas = DateTime.fromFormat('2512' + year, 'ddMMyyyy'),
        sundayBeforeChristmas = christmas.startOf('week'),
        christKingOfTheUniverse = sundayBeforeChristmas.plus({days: -29}),
        firstAdventSunday = sundayBeforeChristmas.plus({days: -22}),
        secondAdventSunday = sundayBeforeChristmas.plus({days: -15}),
        thirdAdventSunday = sundayBeforeChristmas.plus({days: -8}),
        fourthAdventSunday = sundayBeforeChristmas.plus({days: -1}),
        december8 = DateTime.fromFormat('0812' + year, 'ddMMyyyy'),
        immaculateConception = (december8.weekday === 7) ? december8.plus({days: 1}) : december8, // 2
        holyFamily = (christmas.weekday === 7) ? DateTime.fromFormat('3012' + year, 'ddMMyyyy') : DateTime.fromFormat('2512' + year, 'ddMMyyyy').endOf('week'), // 3
        epiphany = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week'), // 4
        baptismOfTheLord = (epiphany.toFormat('dd') === ('07' || '08')) ? baptismOfTheLord = epiphany.plus({days: 1}) : DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week').plus({days: 7}), // 5
        advent = Interval.fromDateTimes(firstAdventSunday, christmas),
        epiphanyTide = Interval.fromDateTimes(epiphany, baptismOfTheLord.plus({days: -1})),
        christmastide = (date <= baptismOfTheLord) ? Interval.fromDateTimes(christmas.plus({years: -1}), baptismOfTheLord) : Interval.fromDateTimes(christmas, baptismOfTheLord.plus({years: 1})), // 6
        octaveOfChristmas = (date <= DateTime.fromFormat('0101' + year, 'ddMMyyyy')) ? Interval.fromDateTimes(DateTime.fromFormat('2512' + year, 'ddMMyyyy').plus({years: -1}), DateTime.fromFormat('0201' + year, 'ddMMyyyy')) : Interval.fromDateTimes(christmas, christmas.plus({days: 7})), // 7
        easter = DateTime.local(ge.year, ge.month, ge.day), // 1
        ashWednesday = easter.plus({days: -46}),
        lent = Interval.fromDateTimes(ashWednesday, easter),
        firstLentSunday = easter.plus({days: -42}),
        secondLentSunday = easter.plus({days: -35}),
        thirdLentSunday = easter.plus({days: -28}),
        fourthLentSunday = easter.plus({days: -21}),
        fiveLentSunday = easter.plus({days: -14}),
        lentSundaysBoolean = (firstLentSunday || secondLentSunday || thirdLentSunday || fourthLentSunday || fiveLentSunday) ? true : false,
        palmSunday = easter.plus({days: -7}),
        holyMonday = easter.plus({days: -6}),
        holyTuesday = easter.plus({days: -5}),
        holyWednesday = easter.plus({days: -4}),
        holyThursday = easter.plus({days: -3}),
        goodFriday = easter.plus({days: -2}),
        holySaturday = easter.plus({days: -1}),
        easterMonday = easter.plus({days: 1}),
        easterTuesday = easter.plus({days: 2}),
        easterWednesday = easter.plus({days: 3}),
        easterThursday = easter.plus({days: 4}),
        easterFriday = easter.plus({days: 5}),
        easterSaturday = easter.plus({days: 6}),
        secondSundayEaster = easter.plus({days: 7}),
        thirdSundayEaster = easter.plus({days: 14}),
        fourthSundayEaster = easter.plus({days: 21}),
        fiveSundayEaster = easter.plus({days: 28}),
        sixSundayEaster = easter.plus({days: 35}),
        ascension = easter.plus({days: 40}),
        pentecost = easter.plus({days: 49}),
        holyTrinity = easter.plus({days: 56}),
        blessedSacrament = easter.plus({days: 63}),
        sacredHeart = easter.plus({days: 68}),
        eastertide = Interval.fromDateTimes(easter, easter.plus({days: 50})),
        holyWeek = Interval.fromDateTimes(palmSunday, easter),
        easterTriduum = Interval.fromDateTimes(easter.plus({days: -3}), easter),
        octaveOfEaster = Interval.fromDateTimes(easter, easter.plus({days: 8})),
        saintsPeterAndPaul = sacredHeart.toFormat('ddMM') === '2906' ? DateTime.fromFormat('3006' + year, 'ddMMyyyy') : DateTime.fromFormat('2906' + year, 'ddMMyyyy'), // 8
        march19 = DateTime.fromFormat('1903' + year, 'ddMMyyyy'),
        march19InHolyWeek = holyWeek.contains(march19) ? palmSunday.plus({days: -1}) : false,
        march19InLentSunday = lentSundaysBoolean ? march19.plus({days: 1}) : false,
        saintJoseph = march19InHolyWeek ? march19InHolyWeek : (march19InLentSunday ? march19InLentSunday : march19) // 9


  // Initialisation des variables si pas de données ou valeurs manquantes dans les .json :
  if (typeof data.name === 'undefined' || data.name === '') data.name = "De la férie", data.color = "",  data.color2 ="", data.grade = "", data.rank = ""
  if (data.color === '') data.color = ""
  if (data.color === '') data.color2 = ""
  if (data.grade === '') data.grade = ""
  if (data.rank === '') data.rank = ""


  // Périodes liturgiques, dénominations :
  if (advent.contains(date)) data.period = "Temps de l'Avent"
  else if (octaveOfChristmas.contains(date)) data.period = "Octave de la Nativité du Seigneur"
  else if (epiphanyTide.contains(date)) data.period = "Après l'Épiphanie"
  else if (christmastide.contains(date)) data.period = "Temps de Noël"
  else if (easterTriduum.contains(date)) data.period = "Triduum pascal"
  else if (holyWeek.contains(date)) data.period = "Semaine Sainte"
  else if (lent.contains(date)) data.period = "Carême"
  else if (octaveOfEaster.contains(date)) data.period = "Octave de Pâques"
  else if (eastertide.contains(date)) data.period = "Temps Pascal"
  else data.period = "Temps ordinaire"


  // Périodes liturgiques, couleurs :
  if (data.color === '') {
    if (advent.contains(date)) data.color = "purple"
    else if (christmastide.contains(date)) data.color = "white"
    else if (lent.contains(date)) data.color = "purple"
    else if (eastertide.contains(date)) data.color = "white"
    else data.color = "green"
  }


  // Définition des fêtes votives. Ces valeurs remplacent les fêtes fixes définies à la même date dans les fichiers json.
  if (firstAdventSunday.hasSame(date, 'day')) data.name = "Premier dimanche de l'Avent, <em>Levavi</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (secondAdventSunday.hasSame(date, 'day')) data.name = "Deuxième dimanche de l'Avent, <em>Populus Sion</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (thirdAdventSunday.hasSame(date, 'day')) data.name = "Troisième dimanche de l'Avent, <em>Gaudete</em>", data.color = "pink",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (fourthAdventSunday.hasSame(date, 'day')) data.name = "Quatrième dimanche de l'Avent, <em>Rorate</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (immaculateConception.hasSame(date, 'day')) data.name = "Immaculée Conception de la Bienheureuse Vierge Marie", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (holyFamily.hasSame(date, 'day')) data.name = "La Sainte Famille", data.color = "white",  data.color2 ="", data.grade = "2", data.rank = "5"
  if (epiphany.hasSame(date, 'day')) data.name = "Épiphanie du Seigneur", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (baptismOfTheLord.hasSame(date, 'day')) data.name = "Le Baptême du Seigneur", data.color = "white",  data.color2 ="", data.grade = "3", data.rank = "5"
  if (ashWednesday.hasSame(date, 'day')) data.name = "Mercredi des Cendres", data.color = "purple",  data.color2 ="", data.grade = "", data.rank = "2"
  if (firstLentSunday.hasSame(date, 'day')) data.name = "Premier dimanche de Carême, <em>Invocabit</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (secondLentSunday.hasSame(date, 'day')) data.name = "Deuxième dimanche de Carême, <em>Reminiscere</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (thirdLentSunday.hasSame(date, 'day')) data.name = "Troisième dimanche de Carême, <em>Oculi</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (fourthLentSunday.hasSame(date, 'day')) data.name = "Quatrième dimanche de Carême, <em>Laetare</em>", data.color = "pink",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (fiveLentSunday.hasSame(date, 'day')) data.name = "Cinquième dimanche de Carême, <em>Judica</em>", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (palmSunday.hasSame(date, 'day')) data.name = "Dimanche des Rameaux et de la Passion du Seigneur", data.color = "red",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (holyMonday.hasSame(date, 'day')) data.name = "Lundi Saint", data.color = "purple",  data.color2 ="", data.grade = "", data.rank = "2"
  if (holyTuesday.hasSame(date, 'day')) data.name = "Mardi Saint", data.color = "purple",  data.color2 ="", data.grade = "", data.rank = "2"
  if (holyWednesday.hasSame(date, 'day')) data.name = "Mercredi Saint", data.color = "purple",  data.color2 ="", data.grade = "", data.rank = "2"
  if (holyThursday.hasSame(date, 'day')) data.name = "Jeudi Saint", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "1" // rank "2" en journée, rank "1" le soir
  if (goodFriday.hasSame(date, 'day')) data.name = "Vendredi Saint", data.color = "red",  data.color2 ="", data.grade = "1", data.rank = "1"
  if (holySaturday.hasSame(date, 'day')) data.name = "Samedi Saint", data.color = "purple",  data.color2 ="", data.grade = "1", data.rank = "1"
  if (easter.hasSame(date, 'day')) data.name = "Résurrection du Seigneur", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "1"
  if (easterMonday.hasSame(date, 'day')) data.name = "Lundi dans l'octave Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easterTuesday.hasSame(date, 'day')) data.name = "Mardi dans l'octave de Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easterWednesday.hasSame(date, 'day')) data.name = "Mercredi dans l'octave de Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easterThursday.hasSame(date, 'day')) data.name = "Jeudi dans l'octave de Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easterFriday.hasSame(date, 'day')) data.name = "Vendredi dans l'octave de Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easterSaturday.hasSame(date, 'day')) data.name = "Samedi dans l'octave de Pâques", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (secondSundayEaster.hasSame(date, 'day')) data.name = "Dimanche de la divine Miséricorde, <em>in albis</em>", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (thirdSundayEaster.hasSame(date, 'day')) data.name = "Troisième dimanche du Temps Pascal", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (fourthSundayEaster.hasSame(date, 'day')) data.name = "Quatrième dimanche du Temps Pascal", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (fiveSundayEaster.hasSame(date, 'day')) data.name = "Cinquième dimanche du Temps Pascal", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (sixSundayEaster.hasSame(date, 'day')) data.name = "Sixième dimanche du Temps Pascal", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (ascension.hasSame(date, 'day')) data.name = "Ascension", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (pentecost.hasSame(date, 'day')) data.name = "Pentecôte", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "2"
  if (easter.plus({days: 50}).hasSame(date, 'day')) data.name = "Bienheureuse Vierge Marie, Mère de l'Église", data.color = "white",  data.color2 ="", data.grade = "3", data.rank = "10"
  if (holyTrinity.hasSame(date, 'day')) data.name = "Sainte Trinité", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (blessedSacrament.hasSame(date, 'day')) data.name = "Le Saint Sacrement", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (sacredHeart.hasSame(date, 'day')) data.name = "Sacré-Cœur de Jésus", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (christKingOfTheUniverse.hasSame(date, 'day')) data.name = "Notre Seigneur Jésus Christ Roi de l'Univers", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (saintsPeterAndPaul.hasSame(date, 'day')) data.name = "Saints Pierre et Paul, apôtres", data.color = "red",  data.color2 ="", data.grade = "1", data.rank = "3"
  if (saintJoseph.hasSame(date, 'day')) data.name = "Saint Joseph, époux de la Vierge Marie", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"


// @todo :

// - Solennité de l'Annonciation du Seigneur à Marie, le 25 mars. Est décalée au 26, si le 25 est un dimanche (ou le premier lundi qui suit le deuxième dimanche de Pâques si le 25 mars se situe pendant la Semaine Sainte).
// data.name = "Annonciation du Seigneur", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"

// Jeudi de la solennité du Saint Sacrement (fête décalée au dimanche dans certaines régions, en particulier en France, ayant reçu un indult en ce sens).

// Solennité de la Nativité de Saint Jean-Baptiste : 24 juin, reporté au 25 si le 24 juin tombe le jour de la solennité du Saint-Sacrement ou du Sacré-Coeur
// data.name = "Nativité de Saint Jean-Baptiste", data.color = "white",  data.color2 ="", data.grade = "1", data.rank = "3"


  // Traducion des degrés de fête en language humain
  let grade = data.grade
  if (grade === '1') data.grade = "Solennité"
  else if (grade === '2') data.grade = "Fête"
  else if (grade === '3') data.grade = "Mémoire obligatoire"
  else if (grade === '4') data.grade = "Mémoire facultative"

  // Calibrage des couleurs liturgiques
  let color = data.color
  if (color === 'green') data.color = 'green' // #1e883f
  else if (color === 'withe') data.color = '#ffffff'
  else if (color === 'red') data.color = '#ff0000' // #bf2329
  else if (color === 'purple') data.color = '#800080' // #9f15a7
  else if (color === 'pink') data.color = '#ff69b4' // hotpink
  else if (color === 'black') data.color = '#000000'
  else if (color === 'gold') data.color = '#ffd700'

  let color2 = data.color2
  if (color2 === 'green') data.color2 = 'green' // #1e883f
  else if (color2 === 'withe') data.color2 = '#ffffff'
  else if (color2 === 'red') data.color2 = '#ff0000' // #bf2329
  else if (color2 === 'purple') data.color2 = '#800080' // #9f15a7
  else if (color2 === 'pink') data.color2 = '#ff69b4' // hotpink
  else if (color2 === 'black') data.color2 = '#000000'
  else if (color2 === 'gold') data.color2 = '#ffd700'


  data.displayDate = `${day}.${month}.${year}, ${date.weekday}` // @todo For test.

  return data
}

/*
for (let i = 1; i < 33; i++) { // @todo For test.
  const d = ('0' + i).slice(-2)
  const lc = liturgicalCalendar(DateTime.fromFormat(d + '012020', 'ddMMyyyy'))
  console.log(lc)
}
*/

module.exports = { liturgicalCalendar: liturgicalCalendar }
