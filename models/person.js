'use strict'

const db = require('../database/db'),
      { personFormat } = require('../helpers/person')

const getPerson = async (id) => await db.one('SELECT * FROM public.__person WHERE _id = $1', id)
  .then(data => {
    data = personFormat(data, id)
    //console.log(data)
    return data
  })
  .catch(error => {
    console.log(error)
  })

module.exports = { getPerson: getPerson }
