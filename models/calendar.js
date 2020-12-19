'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon'),
      currentDate = DateTime.local(),
      //lc = liturgicalCalendar(currentDate, 'france')
      //lc = liturgicalCalendar(DateTime.fromFormat('07082021', 'ddMMyyyy'), 'belgium') // @note For test.
      lc = liturgicalCalendar(DateTime.fromFormat('14122020', 'ddMMyyyy'), 'france') // @note For test.

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendarPeriod: lc.period
  , _calendarDate: lc.displayDate
  , _calendarName: lc.name
  , _calendarPeriodColor: lc.periodColor
  , _calendarPeriodRank: lc.periodRank
  , _calendarColor: lc.color[0]
  , _calendarColor2: lc.color[1]
  , _calendarGrade: lc.grade
  , _calendarRank: lc.rank
  , _calendarUrl: lc.link
  , _moonPhase: moonPhase(currentDate)
}

module.exports = { getCalendar: getCalendar }
