'use strict'

const db = require('../database/db'),
      { placeFormat } = require('../helpers/place')

const getPlace = async (id) => await db.one('SELECT * FROM public.__place WHERE _id = $1', id)
  .then(data => {
    data = data = placeFormat(data)
    //console.log(data)
    return data
  })
  .catch(error => {
    console.log(error)
  })

module.exports = { getPlace: getPlace }
