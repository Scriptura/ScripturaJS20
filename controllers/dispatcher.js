'use strict'

const //path = require('path'),
      express = require('express'),
      app = express(),
      router = express.Router()

app.use(
  '/',
  require(__dirname + '/index')
)

module.exports = router
