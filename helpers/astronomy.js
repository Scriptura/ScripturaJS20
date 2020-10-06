'use strict'

const SunCalc = require('suncalc')

const moonPhase = date => {
  return Math.round(SunCalc.getMoonIllumination(date).phase * 8)
}

module.exports = { moonPhase: moonPhase }
