const { numFormat } = require('../helpers/numbers.js')

describe("Helpers numbers", () => {

  it("Ajoute 3 zéros pour respecter la taille définie de la chaîne qui est de 4 chiffres", () => {
    expect(numFormat(1, 4)).toContain('0001')
  })

})
