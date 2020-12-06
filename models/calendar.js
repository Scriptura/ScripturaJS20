'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon'),
      date = DateTime.fromFormat('08012018', 'ddMMyyyy'), // @note Pour les tests
      lc = liturgicalCalendar(date)

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendarPeriod: lc.period
  , _calendarDate: lc.displayDate
  , _calendarName: lc.name
  , _calendarColor: lc.color
  , _calendarColor2: lc.color2
  , _calendarGrade: lc.grade
  , _calendarRank: lc.rank
  , _calendarUrl: lc.link
  , _moonPhase: moonPhase(new Date)
}

module.exports = { getCalendar: getCalendar }
