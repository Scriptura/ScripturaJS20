'use strict'

// dénomination pour les pays avec la norme ISO 3166-1 : 'alpha-2', 'alpha-3' et 'numeric'

const countries = require('i18n-iso-countries')

const displayCountrie = (countrie, locale = 'fr') => {
  return countries.getName(countrie, locale)
}

module.exports = { displayCountrie: displayCountrie }
