'use strict'

const vv = require('../settings/variables'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { DateTime } = require('luxon'),
      currentDate = DateTime.local(),
      _calendar = liturgicalCalendar(currentDate, 'france')
      //_calendar = liturgicalCalendar(DateTime.fromFormat('08122020', 'ddMMyyyy'), 'france')

const getCalendar = {
  _title: 'Calendar | ' + vv.siteName
  , _name: 'Calendrier liturgique'
  , _description: 'Informations disponibles pour les fonctions de calendrier'
  , _calendar
  , _moonPhase: moonPhase(currentDate)
}

module.exports = { getCalendar: getCalendar }
