'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar')

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendar: liturgicalCalendar().name
  , _calendarUrl: liturgicalCalendar().link
  , _calendarRank: liturgicalCalendar().rank
}

module.exports = { getCalendar: getCalendar }
