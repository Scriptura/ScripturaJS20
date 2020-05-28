'use strict'

const express = require('express'),
      router = express.Router()

      router.use(
        '/',
        require('./index')
      )
      router.use(
        '/',
        require('./article')
      )
      router.use(
        '/',
        require('./person')
      )
      router.use(
        '/',
        require('./user')
      )
      router.use(
        '/',
        require('./place')
      )
      router.use(
        '/',
        require('./login')
      )
      router.use(
        '/',
        require('./os')
      )
      router.use(
        '/',
        require('./styleGuide')
      )

module.exports = router
