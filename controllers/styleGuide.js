'use strict'

const express = require('express'),
      router = express.Router()

router.get('/styleGuide', function(req, res, next) {
  res.render('styleGuide', {
    title: 'Style Guide'
  })
})

module.exports = router
