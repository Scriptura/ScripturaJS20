const { humanDateForMonths } = require('../helpers/dates.js')

describe("Helpers dates", () => {

  it("Date humaine pour le mois, valeur int", () => {
    expect(humanDateForMonths(12)).toBe('décembre')
  })

  it("Date humaine pour le mois, valeur string", () => {
    expect(humanDateForMonths('12')).toBe('décembre')
  })

})
