# resize-logic [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/resize-logic&title=resize-logic&description=hughsk/resize-logic%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Determines the correct dimensions for resizing and cropping images, without being attached to any particular tool

## Usage ##

[![resize-logic](https://nodei.co/npm/resize-logic.png?mini=true)](https://nodei.co/npm/resize-logic)

### `results = resize(options)` ###

`require('resize-logic')` exports a function that takes a selection of options:

``` javascript
var resize  = require('resize-logic')
var options = {
    height: 200
  , original: [400, 200]
  , crop: true
}

var results = resize(options)
```

* `options.original`: the original dimensions of the image as an array, i.e.:
  `[width, height]`
* `options.width`: the target width of the resized image. Optional, but one
  of `height` or `width` must be included.
* `options.height`: the target height of the resized image. Optional, but one
  of `height` or `width` must be included.
* `options.crop`: whether or not to crop the image or just scale it. Defaults to `false`.
* `options.smaller`: whether to scale to handle the smallest of width/height
  or heighest, when both are supplied. Defaults to `true`, or `false` if
  `options.crop` is enabled.

When called, the function returns a results object with the following
properties:

``` javascript
{
    "drawPosition": [-20, 0]
  , "drawDimensions": [400, 200]
  , "canvasDimensions": [360, 200]
}
```

#### `results.drawPosition` ####

The x/y position to draw the image (where the origin is the top-left). Supplied
as an array, i.e. `[x, y]`.

#### `results.drawDimensions` ####

The width and height to draw the image. Supplied as an array, i.e.
`[width, height]`.

#### `results.canvasDimensions` ####

The width and height of the actual canvas to draw on. Supplied as an array,
i.e. `[width, height]`

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/resize-logic/blob/master/LICENSE.md) for details.
