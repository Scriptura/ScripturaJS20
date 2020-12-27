'use strict'

const db = require('../database/db'),
      { articleFormat } = require('../helpers/article')

const getArticle = async id => await db.one('SELECT * FROM public.__post WHERE _id = $1', id)
  .then(data => articleFormat(data))
  .catch(error => {
    console.log(error)
    return data
  })

module.exports = { getArticle: getArticle }
