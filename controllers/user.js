'use strict'

const express = require('express'),
      router = express.Router(),
      { getUser } = require('../models/user')

router.get('/user/:username([0-9a-zA-Z]{1,20})', async (req, res, next) => { // @example '/user/username'
  const data = await getUser(req.params.username)
    .then(data => res.render('user', data))
    .catch(error => next())
})

module.exports = router
