'use strict'

const express = require('express'),
      router = express.Router(),
      { getUser } = require('../models/user')

router.get('/user/:id([0-9]{1,7})', async (req, res, next) => { // @example '/user/1'  // old param: '/person/:name([0-9a-zA-Z]{1,20})'
  const data = await getUser(req.params.id)
    .then(data => {
      res.render('user', data)
    })
    .catch(error => {
      console.log(error)
      next()
    })
})

module.exports = router
