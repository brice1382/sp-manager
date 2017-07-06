var resizer = require('./')
var test = require('tape')

test('fill screen', function(t) {
  t.deepEqual(resizer({
    original: [1200, 800],
    smaller: false,
    height: 700,
    width: 1500,
    crop: true
  }), {
      drawPosition: [0, -150]
    , drawDimensions: [1500, 1000]
    , canvasDimensions: [1500, 700]
  })

  t.deepEqual(resizer({
    original: [800, 1200],
    smaller: false,
    height: 1500,
    width: 700,
    crop: true
  }), {
      drawPosition: [-150, 0]
    , drawDimensions: [1000, 1500]
    , canvasDimensions: [700, 1500]
  })

  t.end()
})

test('fit screen', function(t) {
  t.deepEqual(resizer({
    original: [1200, 800],
    smaller: true,
    height: 700,
    width: 1500,
    crop: false
  }), {
      drawPosition: [0, 0]
    , drawDimensions: [1050, 700]
    , canvasDimensions: [1050, 700]
  })

  t.deepEqual(resizer({
    original: [800, 1200],
    smaller: true,
    height: 1500,
    width: 700,
    crop: false
  }), {
      drawPosition: [0, 0]
    , drawDimensions: [700, 1050]
    , canvasDimensions: [700, 1050]
  })

  t.end()
})


test('fit to one of height or width', function(t) {
  t.deepEqual(resizer({
    original: [1200, 800],
    smaller: true,
    width: 900,
    crop: false
  }), {
      drawPosition: [0, 0]
    , drawDimensions: [900, 600]
    , canvasDimensions: [900, 600]
  })

  t.deepEqual(resizer({
    original: [800, 1200],
    smaller: true,
    height: 900,
    crop: false
  }), {
      drawPosition: [0, 0]
    , drawDimensions: [600, 900]
    , canvasDimensions: [600, 900]
  })

  t.end()
})
