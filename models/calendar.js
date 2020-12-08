'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon'),
      //currentDate = DateTime.local(),
      currentDate = DateTime.fromFormat('30061984', 'ddMMyyyy'), // @note Pour les tests
      lc = liturgicalCalendar(currentDate)

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
  , _moonPhase: moonPhase(currentDate)
}

module.exports = { getCalendar: getCalendar }
