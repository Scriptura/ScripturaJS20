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
    next()
  })

  const postUser = async (username, password) => await db.one('INSERT INTO public.__user (_username, _password) VALUES ($1, $2) RETURNING _username', [username, password])
  .then(data => {
    //console.log(data)
    return data
  })
  .catch(error => {
    console.log(error)
    next()
  })

module.exports = {
  getUser: getUser
  , postUser: postUser
}
