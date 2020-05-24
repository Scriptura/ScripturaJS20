'use strict'

const db = require('../database/db')

const getLogin = async (username) => await db.one('SELECT * FROM public.__user WHERE _username = $1', username)
  .then(data => {
    //console.log(data)
    return data
  })
  .catch(error => {
    console.log(error)
    return data
  })

module.exports = { getLogin: getLogin }
