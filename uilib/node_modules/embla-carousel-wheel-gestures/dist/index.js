
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./embla-carousel-wheel-gestures.cjs.production.min.js')
} else {
  module.exports = require('./embla-carousel-wheel-gestures.cjs.development.js')
}
