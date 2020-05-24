'use strict'

const capitalizeFirstLetter = (str, locale) => {
  // @see https://stackoverflow.com/a/53930826/4960244
  return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale)) // méthode gérant quelques problèmes d'internationalisation
  //return str[0].toUpperCase() + str.slice(1); // méthode originale
}

const constructFullName = (data, id = 0) => {
  data._full_name = 'Anonyme' + ' ' + id
  if (data._given_name) data._full_name = data._given_name
  if (data._middle_name) data._full_name = data._full_name + ' ' + data._middle_name
  if (data._family_name) data._full_name = data._full_name + ' ' + data._family_name
  if (!data._given_name && data._family_name) data._full_name = capitalizeFirstLetter(data._family_name) // Majuscule pour le noms à particules
  return data._full_name
}

const constructPrefixFullNameSuffix = (data, id) => {
  data._full_name = constructFullName(data, id)
  // push() ->         if (data._prefix) = data._prefix_full_name_suffix
  return data._full_name
}

module.exports = {
  capitalizeFirstLetter: capitalizeFirstLetter,
  constructFullName: constructFullName,
  constructPrefixFullNameSuffix: constructPrefixFullNameSuffix
}
