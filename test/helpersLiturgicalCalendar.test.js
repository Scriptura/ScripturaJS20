const { DateTime } = require('luxon'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar')

describe("Liturgical calendar", () => {

  it("Premier dimanche de l'Avent le 29 novembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29112020', 'ddMMyyyy'), 'france')).toMatchObject({key: "firstAdventSunday"})
  })

  it("Deuxième dimanche de l'Avent le 6 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('06122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "secondAdventSunday"})
  })

  it("Immaculée Conception le 8 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "immaculateConception"})
  })

  it("Immaculée Conception le 9 décembre 2019", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('09122019', 'ddMMyyyy'), 'france')).toMatchObject({key: "immaculateConception"})
  })

  it("Troisième dimanche de l'Avent le 13 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('13122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thirdAdventSunday"})
  })

  it("Quatrième dimanche de l'Avent le 20 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('20122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fourthAdventSunday"})
  })

  it("Noël le 25 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "christmas"})
  })

  it("Sainte Famille le dimanche qui suit Noël, le 27 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('27122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyFamily"})
  })

  it("Sainte Famille le 30 décembre 2022 car Noël un dimanche", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('30122022', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyFamily"})
  })

  it("Sainte Marie, Mère de Dieu le 1er janvier 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('01012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyMaryMotherOfGod"})
  })

  it("Épiphanie le dimanche après le premier janvier pour la France", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('03012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "epiphany"})
  })

  it("Baptême du Seigneur le 10 janvier 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('10012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "baptismOfTheLord"})
  })





  it("Fête de St Joseph le 19 mars 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('19032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "saintJoseph"})
  })

  it("19 mars 2035 en Semaine Sainte, fête de St Joseph reportée au samedi avant les Rameaux", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('17032035', 'ddMMyyyy'), 'france')).toMatchObject({key: "saintJoseph"})
  })

  it("En Belgique, Sainte Julienne du Mont-Cornillon le 7 août 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('07082021', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "bel0708"})
  })

})
