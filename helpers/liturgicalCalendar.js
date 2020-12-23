'use strict'

const fs = require('fs'),
      { DateTime, Interval } = require('luxon'),
      easterDate = require('date-easter'),
      currentDate = DateTime.local()


/**
 * Annontations et règles placées dans le fichier de test.
 * @see helpersLiturgicalCalendar.test.js
 * /

/*
* @todo Option à développer :
* const locale = locale || 'fr'
* const epiphanyOnJan6 = epiphanyOnJan6 || false
* const christmastideIncludesTheSeasonOfEpiphany = christmastideIncludesTheSeasonOfEpiphany || true
* const corpusChristiOnThursday = corpusChristiOnThursday || false
* const ascensionOnSunday = ascensionOnSunday || false
*/

/**
 * @param {object} date, optional
 * @param {string} country, optional
 * @return {object}
 */

const liturgicalCalendar = (date = currentDate, country = 'france') => {

  const year = date.toFormat('yyyy'),
        month = date.toFormat('MM'),
        day = date.toFormat('dd'),
        dayMonth = day + month,
        // Chargement des .json et fusion des données :
        data1 = JSON.parse(fs.readFileSync('./data/json/generalRomanCalendar.json')),
        data2 = JSON.parse(fs.readFileSync('./data/json/europeRomanCalendar.json')),
        data3 = JSON.parse(fs.readFileSync('./data/json/' + country + 'RomanCalendar.json')),
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
        baptismOfTheLord = epiphany > DateTime.fromFormat('0701' + year, 'ddMMyyyy') ? epiphany.plus({days: 1}) : DateTime.fromFormat('0801' + year, 'ddMMyyyy').endOf('week'), // 5
        advent17_24 = Interval.fromDateTimes(DateTime.fromFormat('1712' + year, 'ddMMyyyy'), DateTime.fromFormat('2412' + year, 'ddMMyyyy')), // 13
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
        divineMercySunday = easter.plus({days: 7}),
        thirdSundayEaster = easter.plus({days: 14}),
        fourthSundayEaster = easter.plus({days: 21}),
        fiveSundayEaster = easter.plus({days: 28}),
        sixSundayEaster = easter.plus({days: 35}),
        ascension = easter.plus({days: 40}),
        pentecost = easter.plus({days: 49}),
        maryMotherOfTheChurch = easter.plus({days: 50}),
        holyTrinity = easter.plus({days: 56}),
        feastOfCorpusChristi = easter.plus({days: 63}), // easter.plus({days: 60}) // 11
        sacredHeart = easter.plus({days: 68}),
        immaculateHeartOfMary = easter.plus({days: 69}),
        eastertide = Interval.fromDateTimes(easter, easter.plus({days: 50})),
        holyWeek = Interval.fromDateTimes(palmSunday, easter),
        easterTriduum = Interval.fromDateTimes(easter.plus({days: -3}), easter),
        octaveOfEaster = Interval.fromDateTimes(easter, easter.plus({days: 8})),
        saintsPeterAndPaul = sacredHeart.toFormat('ddMM') === '2906' ? DateTime.fromFormat('3006' + year, 'ddMMyyyy') : DateTime.fromFormat('2906' + year, 'ddMMyyyy'), // 8
        march19 = DateTime.fromFormat('1903' + year, 'ddMMyyyy'),
        march19InHolyWeek = holyWeek.contains(march19) ? true : false,
        march19InLentSunday = (lent.contains(date) && march19.weekday === 7) ? true : false,
        saintJoseph = march19InHolyWeek ? palmSunday.plus({days: -1}) : (march19InLentSunday ? march19.plus({days: 1}) : march19), // 9
        march25 = DateTime.fromFormat('2503' + year, 'ddMMyyyy'),
        annunciation = holyWeek.contains(march25) ? divineMercySunday.plus({days: 1}) : (march25.weekday === 7 ? march25.plus({days: 1}) : march25), // 10
        nativityOfSaintJohnTheBaptist = (feastOfCorpusChristi.toFormat('ddMM') || sacredHeart.toFormat('ddMM') === '2406') ? DateTime.fromFormat('2506' + year, 'ddMMyyyy') : DateTime.fromFormat('2406' + year, 'ddMMyyyy') // 12


  // Valeurs par défaut pour les variables incontournables si pas de célébration fixe proposée ou si valeur name intentionnellement manquante dans les .json :
  if (typeof data.name === 'undefined' || data.name === '') data.name = "De la férie"
  if (typeof data.color === 'undefined') data.color = []
  if (typeof data.link === 'undefined') data.link = []
  if (typeof data.grade === 'undefined') data.grade = ''
  if (typeof data.rank === 'undefined') data.rank = 13


  // Si un dimanche et si célébration en occurence inrérieure à 7 alors dimanche du temps ordinaire prioritaire :
  if (date.weekday === 7 && data.rank > 7) data.name = "Dimanche du temps ordinaire", data.grade = "", data.color = "green"


  // Définition des fêtes votives. Ces valeurs remplacent les fêtes fixes définies à la même date dans les fichiers json.
  if (firstAdventSunday.hasSame(date, 'day')) data.key = "firstAdventSunday", data.name = "Premier dimanche de l'Avent, <em>Levavi</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (secondAdventSunday.hasSame(date, 'day')) data.key = "secondAdventSunday", data.name = "Deuxième dimanche de l'Avent, <em>Populus Sion</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (thirdAdventSunday.hasSame(date, 'day')) data.key = "thirdAdventSunday", data.name = "Troisième dimanche de l'Avent, <em>Gaudete</em>", data.color = ["pink"], data.grade = 1, data.rank = 2
  if (fourthAdventSunday.hasSame(date, 'day')) data.key = "fourthAdventSunday", data.name = "Quatrième dimanche de l'Avent, <em>Rorate</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (immaculateConception.hasSame(date, 'day')) data.key = "immaculateConception", data.name = "Immaculée Conception de la Bienheureuse Vierge Marie", data.color = ["white"], data.grade = 1, data.rank = 3
  if (holyFamily.hasSame(date, 'day')) data.key = "holyFamily", data.name = "La Sainte Famille", data.color = ["white"], data.grade = 2, data.rank = 5
  if (epiphany.hasSame(date, 'day')) data.key = "epiphany", data.name = "Épiphanie du Seigneur", data.color = ["white"], data.grade = 1, data.rank = 2
  if (baptismOfTheLord.hasSame(date, 'day')) data.key = "baptismOfTheLord", data.name = "Le Baptême du Seigneur", data.color = ["white"], data.grade = 2, data.rank = 5
  if (ashWednesday.hasSame(date, 'day')) data.key = "ashWednesday", data.name = "Mercredi des Cendres", data.color = ["purple"], data.grade = "", data.rank = 2
  if (firstLentSunday.hasSame(date, 'day')) data.key = "firstLentSunday", data.name = "Premier dimanche de Carême, <em>Invocabit</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (secondLentSunday.hasSame(date, 'day')) data.key = "secondLentSunday", data.name = "Deuxième dimanche de Carême, <em>Reminiscere</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (thirdLentSunday.hasSame(date, 'day')) data.key = "thirdLentSunday", data.name = "Troisième dimanche de Carême, <em>Oculi</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (fourthLentSunday.hasSame(date, 'day')) data.key = "fourthLentSunday", data.name = "Quatrième dimanche de Carême, <em>Laetare</em>", data.color = ["pink"], data.grade = 1, data.rank = 2
  if (fiveLentSunday.hasSame(date, 'day')) data.key = "fiveLentSunday", data.name = "Cinquième dimanche de Carême, <em>Judica</em>", data.color = ["purple"], data.grade = 1, data.rank = 2
  if (palmSunday.hasSame(date, 'day')) data.key = "palmSunday", data.name = "Dimanche des Rameaux et de la Passion du Seigneur", data.color = ["red"], data.grade = 1, data.rank = 2
  if (holyMonday.hasSame(date, 'day')) data.key = "holyMonday", data.name = "Lundi Saint", data.color = ["purple"], data.grade = "", data.rank = 2
  if (holyTuesday.hasSame(date, 'day')) data.key = "holyTuesday", data.name = "Mardi Saint", data.color = ["purple"], data.grade = "", data.rank = 2
  if (holyWednesday.hasSame(date, 'day')) data.key = "holyWednesday", data.name = "Mercredi Saint", data.color = ["purple"], data.grade = "", data.rank = 2
  if (holyThursday.hasSame(date, 'day')) data.key = "holyThursday", data.name = "Jeudi Saint", data.color = ["white"], data.grade = 1, data.rank = 1 // @todo rank=2 en journée, rank=1 le soir
  if (goodFriday.hasSame(date, 'day')) data.key = "goodFriday", data.name = "Vendredi Saint", data.color = ["red"], data.grade = 1, data.rank = 1
  if (holySaturday.hasSame(date, 'day')) data.key = "holySaturday", data.name = "Samedi Saint", data.color = ["purple"], data.grade = 1, data.rank = 1
  if (easter.hasSame(date, 'day')) data.key = "easter", data.name = "Résurrection du Seigneur", data.color = ["white"], data.grade = 1, data.rank = 1
  if (easterMonday.hasSame(date, 'day')) data.key = "easterMonday", data.name = "Lundi dans l'octave Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (easterTuesday.hasSame(date, 'day')) data.key = "easterTuesday", data.name = "Mardi dans l'octave de Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (easterWednesday.hasSame(date, 'day')) data.key = "easterWednesday", data.name = "Mercredi dans l'octave de Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (easterThursday.hasSame(date, 'day')) data.key = "easterThursday", data.name = "Jeudi dans l'octave de Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (easterFriday.hasSame(date, 'day')) data.key = "easterFriday", data.name = "Vendredi dans l'octave de Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (easterSaturday.hasSame(date, 'day')) data.key = "easterSaturday", data.name = "Samedi dans l'octave de Pâques", data.color = ["white"], data.grade = 1, data.rank = 2
  if (divineMercySunday.hasSame(date, 'day')) data.key = "divineMercySunday", data.name = "Dimanche de la divine Miséricorde, <em>in albis</em>", data.color = ["white"], data.grade = 1, data.rank = 2
  if (thirdSundayEaster.hasSame(date, 'day')) data.key = "thirdSundayEaster", data.name = "Troisième dimanche du Temps Pascal, <em>Jubilate</em>", data.color = ["white"], data.grade = 1, data.rank = 2
  if (fourthSundayEaster.hasSame(date, 'day')) data.key = "fourthSundayEaster", data.name = "Quatrième dimanche du Temps Pascal, <em>Cantate</em>", data.completedName = "Ou dimanche \"du Bon Pasteur\"", data.color = ["white"], data.grade = 1, data.rank = 2
  if (fiveSundayEaster.hasSame(date, 'day')) data.key = "fiveSundayEaster", data.name = "Cinquième dimanche du Temps Pascal", data.completedName = "Ou dimanche dit \"des Rogations\"", data.color = ["white"], data.grade = 1, data.rank = 2
  if (sixSundayEaster.hasSame(date, 'day')) data.key = "sixSundayEaster", data.name = "Sixième dimanche du Temps Pascal", data.color = ["white"], data.grade = 1, data.rank = 2
  if (ascension.hasSame(date, 'day')) data.key = "ascension", data.name = "Ascension", data.color = ["white"], data.grade = 1, data.rank = 2
  if (pentecost.hasSame(date, 'day')) data.key = "pentecost", data.name = "Pentecôte", data.color = ["white"], data.grade = 1, data.rank = 2
  if (maryMotherOfTheChurch.hasSame(date, 'day')) data.key = "maryMotherOfTheChurch", data.name = "Bienheureuse Vierge Marie, Mère de l'Église", data.color = ["white"], data.grade = 3, data.rank = 10 // 14
  if (holyTrinity.hasSame(date, 'day')) data.key = "holyTrinity", data.name = "Sainte Trinité", data.color = ["white"], data.grade = 1, data.rank = 3
  if (feastOfCorpusChristi.hasSame(date, 'day')) data.key = "feastOfCorpusChristi", data.name = "Le Saint Sacrement du Corps et du Sang du Christ (Fête-Dieu)", data.color = ["white"], data.grade = 1, data.rank = 3
  if (sacredHeart.hasSame(date, 'day')) data.key = "sacredHeart", data.name = "Sacré-Cœur de Jésus", data.color = ["white"], data.grade = 1, data.rank = 3
  if (immaculateHeartOfMary.hasSame(date, 'day')) data.key = "immaculateHeartOfMary", data.name = "Cœur immaculé de Marie", data.color = ["white"], data.grade = 3, data.rank = 10 // 14
  if (christKingOfTheUniverse.hasSame(date, 'day')) data.key = "christKingOfTheUniverse", data.name = "Notre Seigneur Jésus Christ Roi de l'Univers", data.color = ["white"], data.grade = 1, data.rank = 3
  if (saintsPeterAndPaul.hasSame(date, 'day')) data.key = "saintsPeterAndPaul", data.name = "Saints Pierre et Paul, apôtres", data.color = ["red"], data.grade = 1, data.rank = 3
  if (saintJoseph.hasSame(date, 'day')) data.key = "saintJoseph", data.name = "Saint Joseph, chaste Époux de la Bienheureuse Vierge Marie", data.color = ["white"], data.grade = 1, data.rank = 3
  if (annunciation.hasSame(date, 'day')) data.key = "annunciation", data.name = "Annonciation du Seigneur", data.color = ["white"], data.grade = 1, data.rank = 3
  if (nativityOfSaintJohnTheBaptist.hasSame(date, 'day')) data.key = "nativityOfSaintJohnTheBaptist", data.name = "Nativité de Saint Jean-Baptiste", data.color = ["white"], data.grade = 1, data.rank = 3


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


  // Périodes liturgiques, priorités et couleurs :
  if (advent17_24.contains(date)) data.periodRank = 9, data.periodColor = "purple"
  else if (advent.contains(date)) data.periodRank = 13, data.periodColor = "purple"
  else if (octaveOfChristmas.contains(date)) data.periodRank = 9, data.periodColor = "white"
  else if (christmastide.contains(date)) data.periodRank = 13, data.periodColor = "white"
  else if (lent.contains(date)) data.periodRank = 9, data.periodColor = "purple"
  else if (eastertide.contains(date)) data.periodRank = 13, data.periodColor = "white"
  else data.periodColor = "green"


  // Si période de carême, mémoires obligatoires rétrogradées en mémoires facultatives pour l'année en cours :
  if (lent.contains(date) && data.grade === 3) data.grade = 4, data.rank = 12


  // Traducion des degrés de fête en language humain
  if (data.grade === 1) data.grade = "Solennité"
  else if (data.grade === 2) data.grade = "Fête"
  else if (data.grade === 3) data.grade = "Mémoire obligatoire"
  else if (data.grade === 4) data.grade = "Mémoire facultative"


  data.displayDate = `${day}/${month}/${year} {${date.weekday}}` // @todo For test.

  return data
}

/*
const { numFormat } = require('../helpers/numbers')

const test0 = (() => { // @todo For test.
  for (let i = 1; i < 32; i++) {
    const d = numFormat(i, 2)
    console.log(d)
    const lc = liturgicalCalendar(DateTime.fromFormat(d + '012020', 'ddMMyyyy'))
    console.log(lc)
  }
})()
*/
/*
const test1 = (() => { // @todo For test.
  const begin = 2010
  const end = 2030
  for (let i = begin; i <= end; i++) {
    const lc = liturgicalCalendar(DateTime.fromFormat('2003' + i, 'ddMMyyyy'), 'france')
    console.log(i)
    console.log(lc)
  }
})()
*/

module.exports = { liturgicalCalendar: liturgicalCalendar }
