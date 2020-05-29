'use strict'

const path = require('path'),
      express = require('express'),
      router = express.Router()

router.use(
  '/',
  require(path.join(__dirname, 'index'))
)
router.use(
  '/',
  require(path.join(__dirname, 'article'))
)
router.use(
  '/',
  require(path.join(__dirname, 'person'))
)
router.use(
  '/',
  require(path.join(__dirname, 'user'))
)
router.use(
  '/',
  require(path.join(__dirname, 'place'))
)
router.use(
  '/',
  require(path.join(__dirname, 'login'))
)
router.use(
  '/',
  require(path.join(__dirname, 'register'))
)
router.use(
  '/',
  require(path.join(__dirname, 'os'))
)
  router.use(
  '/',
  require(path.join(__dirname, 'styleGuide'))
)

module.exports = router
