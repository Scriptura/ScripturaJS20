const { DateTime } = require('luxon'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar')

describe("Liturgical calendar", () => {

  it("Noël le 25 dé&cembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25122020', 'ddMMyyyy'), 'france')).toEqual({degre: 1})
  })

})


// 17032035 : 19 mars en Semaine Sainte, fête de St Joseph reportée au samedi avant les Rameaux.