'use strict'

const express = require('express'),
      router = express.Router(),
      { getArticle } = require('../models/article')

router.get('/article/:id([0-9]{1,7})', async (req, res, next) => { // @example '/article/1'
  const data = await getArticle(req.params.id)
    .then(data => res.render('article', data))
    .catch(error => {
      console.log(error)
      next()
    })
})

module.exports = router
