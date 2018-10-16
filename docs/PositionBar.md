# `PositionBar` (component)

Creates a PositionBar of markers for every n-th sequence column.

## Props

### `engine`

Rendering engine: `canvas` or `webgl` (experimental).

type: `enum('canvas'|'webgl')`
defaultValue: `"canvas"`


### `font`

Font of the sequence labels, e.g. `20px Arial`

type: `string`
defaultValue: `"12px Arial"`


### `height`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`


### `markerSteps`

At which steps the position labels should appear, e.g. `2` for (1, 3, 5)

type: `number`
defaultValue: `2`


### `msecsPerFps`

defaultValue: `60`


### `msecsPerSecs`

Maximum number of frames per second, e.g. `1000 / 60`

type: `number`


### `startIndex`

At which number the PositionBar marker should start counting.
Typical values are: `1` (1-based indexing) and `0` (0-based indexing).

type: `number`
defaultValue: `1`


### `style`

Custom style configuration.

type: `object`


### `width`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`

