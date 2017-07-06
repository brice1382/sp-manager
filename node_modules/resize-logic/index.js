module.exports = crop

function crop(options) {
  options = options || {}

  var wGoal = options.width
  var hGoal = options.height
  var wShould = typeof wGoal === 'number' && wGoal
  var hShould = typeof hGoal === 'number' && hGoal

  if (!wShould && !hShould) {
    throw new Error(
      'At least one of "width" or "height" must be supplied to options'
    )
  }

  if (!options.original) {
    throw new Error(
      'The "original" option is missing. It should be an array like: ' +
      '[width, height] describing the image\'s dimensions before resizing'
    )
  }

  var wOriginal = options.original[0]
  var hOriginal = options.original[1]
  var crop = !!options.crop

  var smaller = 'smaller' in options
    ? options.smaller
    : !crop

  var xscale = wShould
    ? wGoal / wOriginal
    : hGoal / hOriginal

  var yscale = hShould
    ? hGoal / hOriginal
    : wGoal / wOriginal

  var scale = smaller
    ? Math.min(xscale, yscale)
    : Math.max(yscale, xscale)

  var wDraw = wOriginal * scale
  var hDraw = hOriginal * scale
  var xDraw = 0
  var yDraw = 0

  if (crop) {
    xDraw -= (wDraw - (wGoal || hGoal)) / 2
    yDraw -= (hDraw - (hGoal || wGoal)) / 2
  } else {
    wGoal = wDraw
    hGoal = hDraw
  }

  wGoal = wGoal || (hGoal * wDraw / hDraw)
  hGoal = hGoal || (wGoal * hDraw / wDraw)

  return {
      drawPosition:     [xDraw, yDraw]
    , drawDimensions:   [wDraw, hDraw]
    , canvasDimensions: [wGoal, hGoal]
  }
}
