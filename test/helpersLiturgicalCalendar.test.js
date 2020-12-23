const { DateTime } = require('luxon'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar')


/**
 * Source @see https://fr.wikipedia.org/wiki/Calendrier_liturgique_romain
 * Vérification @see https://www.aelf.org/calendrier/romain/2020/01
 * La préséance est déterminée par une valeur rank dans les fichiers .json, mais dans la pratique le calendrier romain sert de base et ses valeurs peuvent être écrasées par les propres qui sont chargés après lui, sans besoin de calcul logiciel.
 * Si une fête fixe du calendrier général devient votive dans le propre d'un pays, le .json du pays concerné mentionnera une valeur vide pour le nom en lieu et place de la date ({"name": ""}), ceci afin de permettre les traitements qui annuleront la fête, la fête votive sera au final déterminée par calcul logiciel.
 * 1. Vérification des dates de Pâques @see http://5ko.free.fr/fr/easter.php
 * 2. Immaculée Conception le 08/12, si dimanche alors célébration le lundi 09/12.
 * 3. Sainte Famille le dimanche qui suit Noël, si Noël est un dimanche alors le 30/12.
 * 4. Épiphanie le 06/01 pour le calendrier général, le dimanche après le premier janvier pour la France et les autres pays qui ne chôment pas ce jour-là.
 * 5. Baptême du Seigneur célébré à la place du 1er dimanche ordinaire, ou le lendemain de l'Épiphanie si celle-ci est célébrée le 7 ou 8 janvier.
 * 6. Période de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année suivante.
 * 7. Octave de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année suivante.
 * 8. Solennité de Saint Pierre et Saint Paul : 29 juin, reporté au 30 si le 29 tombe le jour de la solennité du Sacré-Coeur.
 * 9. Saint Joseph, époux. Si la fête tombe un dimanche, autre que le Dimanche des Rameaux, celle-ci est célébrée le jour suivant, généralement le lundi 20 mars, mais seulement si une autre solennité (par exemple, un autre Saint patron de l'Église) n'est pas célébrée durant cette journée. Depuis 2008, si le jour de la Fête de Saint Joseph tombe pendant la Semaine Sainte, la célébration de sa fête est déplacée vers le jour le plus proche possible avant le 19 mars, généralement le samedi précédant la Semaine Sainte.
 * 10. Annonciation du Seigneur à Marie. Le 25 mars. Le premier lundi qui suit le deuxième dimanche de Pâques si le 25 mars se situe pendant la Semaine Sainte. Décalée au 26, si le 25 est un dimanche.
 * 11. Fête-Dieu célébrée le jeudi qui suit la Sainte-Trinité, c'est-à-dire soixante jours après Pâques, reportée au dimanche qui suit la Sainte-Trinité dans les pays où elle n'est pas inscrite au nombre des jours fériés (France).
 * 12. Nativité de Saint Jean-Baptiste : le 24 juin, reporté au 25 si le 24 juin tombe le jour de la solennité du Saint-Sacrement ou du Sacré-Coeur.
 * 13. Avent du 17 au 24, n'a pas la même préséance que le début du temps de l'Avent (=> 9)
 * 14. La Mémoire de la bienheureuse Vierge Marie, Mère de l’Église étant liée à la Pentecôte, de même que la Mémoire du Cœur immaculé de la bienheureuse Vierge Marie est conjointe à la célébration du très saint Cœur de Jésus, en cas de coïncidence avec une autre Mémoire d’un saint ou d’un bienheureux, selon la tradition liturgique de la prééminence entre les personnes, c’est la Mémoire de la bienheureuse Vierge Marie qui prévaut. Congrégation pour le Culte divin et la Discipline des Sacrements, le 24 mars 2018.
*/

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

  it("19 mars 2035 en Semaine Sainte, alors fête de St Joseph reportée au samedi avant les Rameaux, le 15 mars", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('17032035', 'ddMMyyyy'), 'france')).toMatchObject({key: "saintJoseph"})
  })

  it("Annonciation le 25 mars 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25032021', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("25 mars 2012 un dimanche, alors Annonciation le 26 mars", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('26032012', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("25 mars 2024 pendant la Semaine Sainte, alors Annonciation le 8 avril", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08042024', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("Mercredi des Cendres le 26 février 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('26022020', 'ddMMyyyy'), 'france')).toMatchObject({key: "ashWednesday"})
  })

  it("Premier dimanche de Carême le 1er mars 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('01032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "firstLentSunday"})
  })

  it("Deuxième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "secondLentSunday"})
  })

  it("Troisième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('15032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thirdLentSunday"})
  })

  it("Quatrième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('22032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fourthLentSunday"})
  })

  it("Cinquième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fiveLentSunday"})
  })

  it("Dimanche des Rameaux", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('05042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "palmSunday"})
  })


/*

  it("", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08042024', 'ddMMyyyy'), 'france')).toMatchObject({key: ""})
  })

        holyMonday
        holyTuesday
        holyWednesday
        holyThursday
        goodFriday
        holySaturday
        easterMonday
        easterTuesday
        easterWednesday
        easterThursday
        easterFriday
        easterSaturday
        divineMercySunday
        thirdSundayEaster
        fourthSundayEaster
        fiveSundayEaster
        sixSundayEaster
        ascension
        pentecost
        maryMotherOfTheChurch
        holyTrinity
*/


  it("Saint Sacrement", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('14062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "corpusChristi"})
  })

  it("Sacré-Cœur de Jésus le 19 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('19062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "sacredHeart"})
  })

  it("Sacré-Cœur de Jésus le 2 juillet 2038", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('02072038', 'ddMMyyyy'), 'france')).toMatchObject({key: "sacredHeart"})
  })

  it("Nativité de Saint Jean-Baptiste le 24 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('24062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfSaintJohnTheBaptist"})
  })

  it("24 juin 2057 jour du Saint-Sacrement, alors Nativité de Saint Jean-Baptiste le 25 juin", () => { // @todo A déterminer...
    expect(liturgicalCalendar(DateTime.fromFormat('25062057', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfSaintJohnTheBaptist"})
  })

  it("24 juin 2022 jour du Sacré-Coeur, alors Nativité de Saint Jean-Baptiste le 25 juin", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25062022', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfSaintJohnTheBaptist"})
  })













  it("En Belgique, Sainte Julienne du Mont-Cornillon le 7 août 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('07082021', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "bel0708"})
  })

})
