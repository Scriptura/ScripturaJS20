'use strict'

const capitalizeFirstLetter = (str, locale) => {
  // @see https://stackoverflow.com/a/53930826/4960244
  return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale)) // méthode gérant quelques problèmes d'internationalisation
  //return str[0].toUpperCase() + str.slice(1); // méthode originale
}

const constructFullName = (data, id = 0) => {
  if (data._given_name || data._middle_name || data._family_name) data._full_name = [data._given_name, data._middle_name, data._family_name].filter(Boolean).join(' ')
  else data._full_name = 'Anonyme ' + id
  if (!data._given_name && !data._middle_name && data._family_name) data._full_name = capitalizeFirstLetter(data._family_name)
  return data._full_name
}

const constructPrefixFullNameSuffix = (data, id) => {
  data._prefix_full_name_suffix = data._full_name
  if (data._prefix && data._full_name) data._prefix_full_name_suffix = data._prefix.concat(' ', data._prefix_full_name_suffix)
  if (data._full_name && data._suffix) data._prefix_full_name_suffix = data._prefix_full_name_suffix.concat(', ', data._suffix)
  return data._prefix_full_name_suffix
}

module.exports = {
  capitalizeFirstLetter: capitalizeFirstLetter,
  constructFullName: constructFullName,
  constructPrefixFullNameSuffix: constructPrefixFullNameSuffix
}
