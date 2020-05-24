'use strict'

const db = require('../database/db'),
      { userFormat } = require('../helpers/user')

const getUser = async (id) => await db.one('SELECT * FROM public.__user WHERE _id = $1', id)
  .then(data => {
    data = userFormat(data)
    //console.log(data)
    return data
  })
  .catch(error => {
    console.log(error)
    return data
  })

module.exports = { getUser: getUser }
