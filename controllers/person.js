'use strict'

const express = require('express'),
      router = express.Router(),
      { getPerson } = require('../models/person')

router.get('/person/:id([0-9]{1,7})', async (req, res, next) => { // @example '/person/1'
  // @todo '/person/:name([0-9a-zA-Z]{1,20})'
  const data = await getPerson(req.params.id)
    .then(data => res.render('person', data))
    .catch(error => {
      console.log(error)
      return data
    })
})

module.exports = router
