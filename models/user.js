'use strict'

const db = require('../database/db'),
      { userFormat } = require('../helpers/user')

const getUser = async (username) => await db.one('SELECT * FROM public.__user WHERE _username = $1', username)
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
