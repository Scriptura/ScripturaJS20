'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy')

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendarName: liturgicalCalendar().name
  , _calendarColor: liturgicalCalendar().color
  , _calendarColor2: liturgicalCalendar().color2
  , _calendarGrade: liturgicalCalendar().grade
  , _calendarRank: liturgicalCalendar().rank
  , _calendarUrl: liturgicalCalendar().link
  , _moonPhase: moonPhase(new Date)
}

module.exports = { getCalendar: getCalendar }
