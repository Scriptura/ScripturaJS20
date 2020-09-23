'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables'),
      os = require('os'),
      ip = require('ip')

router.get('/os', (req, res, next) => {
  res.render('os', {
    _title: 'Os | ' + vv.siteName
    , _meta_description: 'Information sur les données système et utilisateur'
    , _name: 'Os'
    //, _site_url: process.env.PORT
    , _node_version: process.version
    , _hostname: os.hostname()
    , _ip: ip.address()
    , _arch: os.arch()
    , _totalmem: os.totalmem() / 1024000000 // Go
    , _release: os.release()
    , _type: os.type()
    , _platform: os.platform()
    , _homedir: os.homedir()
    , _tmpdir: os.tmpdir()
    , _user_os: req.useragent.os
    , _user_platform: req.useragent.platform
    , _user_browser: req.useragent.browser
    , _user_version: req.useragent.version
  })
})

module.exports = router
