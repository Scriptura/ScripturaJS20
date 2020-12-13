'use strict'

const SunCalc = require('suncalc')

const moonPhase = date => {
  const phase = Math.round(SunCalc.getMoonIllumination(date).phase * 7)
  return phase
}

module.exports = { moonPhase: moonPhase }
