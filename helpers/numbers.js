'use strict'

/**
 * Ajout du nombre de zéros sur la gauche nécessaire pour respecter une chaîne de taille fixe définie pour le nombre.
 * @param {integer} number, nombre de départ
 * @param {integer} figures, taille de la chaine
 * @return {integer}
 */

const numFormat = (number, figures) => {
  return new Array(figures - (number + '').length + 1).join('0') + number
}

module.exports = {
  numFormat: numFormat
}
