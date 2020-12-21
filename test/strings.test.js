const { capitalizeFirstLetter } = require('../helpers/strings.js')

describe("Helpers, number", () => {

  it('Capitalize first letter', () => {
    expect(capitalizeFirstLetter('lorem ipsum dolor sit amet')).toBe('Lorem ipsum dolor sit amet')
  })

})
