const numFormat = (number, figures) => { // @params nombre de départ, nombre de chiffres minimum
  return new Array(figures - (number + '').length + 1).join('0') + number;
}
