'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon'),
      currentDate = DateTime.local(),
      //lc = liturgicalCalendar(currentDate, 'france')
      lc = liturgicalCalendar(DateTime.fromFormat('29112020', 'ddMMyyyy'), 'france')

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendarPeriod: lc.period
  , _calendarDate: lc.displayDate
  , _calendarName: lc.name
  , _calendarExtra: lc.extra
  , _calendarPeriodColor: lc.periodColor
  , _calendarPeriodPriority: lc.periodPriority
  , _calendarColor: lc.color
  , _calendarType: lc.type
  , _calendarPriority: lc.priority
  , _calendarLink: lc.link
  , _moonPhase: moonPhase(currentDate)
}

module.exports = { getCalendar: getCalendar }
