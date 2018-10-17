`<MSAViewer />`
=============

[![Travis](https://img.shields.io/travis/plotly/react-msa-viewer/master.svg)](https://travis-ci.org/plotly/react-msa-viewer)
[![NPM](https://img.shields.io/npm/v/@plotly/react-msa-viewer.svg)](https://www.npmjs.com/package/@plotly/react-msa-viewer)

`react-msa-viewer` is a performant, extendable, highly-customizable, production-ready
React Component that renders a Multiple Sequence Alignment (MSA).

__WARNING: Work in progress - use with caution__

Live demo
---------

<a href="https://msa.bio.sh">
  <img alt="MSAViewer example" src="https://user-images.githubusercontent.com/4370550/46425572-50a8b900-c73c-11e8-9f46-a9cac3a5000b.png" />
</a>

Checkout the storybook at https://msa.bio.sh

Getting started
---------------

```js
import MSAViewer from '@plotly/react-msa-viewer';

function MSA() {
  const options = {
    sequences: [
      {
        name: "seq.1",
        sequence: "MEEPQSDPSIEP-PLSQETFSDLWKLLPENNVLSPLPS-QA-VDDLMLSPDDLAQWLTED"
      },
      {
        name: "seq.2",
        sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
      },
      {
        name: "seq.3",
        sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
      },
    ],
    height: 60,
    colorScheme: "zappo",
  };
  return (
    <MSAViewer {...options} />
  );
}
```

### Installation

For [npm](https://www.npmjs.com) users, run:

```
npm i --save @plotly/react-msa-viewer
```

For [yarn](https://yarnpkg.com/en) users, run:

```
yarn add @plotly/react-msa-viewer
```

### Usage in Vanilla JS

Using the `react-msa-viewer` withinReact is highly recommended.
However, it can be used in Vanilla JS:

```
<html>
	<meta charset="utf-8" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.5.2/prop-types.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/15.4.2/react-dom.min.js"></script>
	<script src="https://unpkg.com/@plotly/react-msa-viewer/dist/index.js"></script>
	<body>
		<div id="my-msa" />
		<script>
		var options = {
		    sequences: [
		      {
		        name: "seq.1",
		        sequence: "MEEPQSDPSIEP-PLSQETFSDLWKLLPENNVLSPLPS-QA-VDDLMLSPDDLAQWLTED"
		      },
		      {
		        name: "seq.2",
		        sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
		      },
		      {
		        name: "seq.3",
		        sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
		      },
		    ],
		    height: 60,
			colorScheme: "zappo",
		 };
		ReactDOM.render(
		  React.createElement(ReactMSAViewer.MSAViewer, options),
		  document.getElementById('my-msa')
		);
		</script>
	</body>
</html>
```

Props
-----

__Warning__: these properties are still suspectible to a _change at any moment_.

### `MSAViewer` (component)

TBD.

### `Labels` (component)

Displays the sequence names.

#### Props

##### `engine`

Rendering engine: `canvas` or `webgl` (experimental).

type: `enum('canvas'|'webgl')`
defaultValue: `"canvas"`


##### `font`

Font of the sequence labels, e.g. `20px Arial`

type: `string`


##### `height`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`


##### `msecsPerFps`

defaultValue: `60`


##### `msecsPerSecs`

Maximum number of frames per second, e.g. `1000 / 60`

type: `number`


##### `style`

Custom style configuration.

type: `object`


##### `width`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`


### `OverviewBar` (component)

Creates a small overview box of the sequences for a general overview.

#### Props

##### `fillColor`

defaultValue: `"#999999"`


##### `height`

defaultValue: `50`


##### `method`

defaultValue: `"conservation"`


### `PositionBar` (component)

Creates a PositionBar of markers for every n-th sequence column.

#### Props

##### `engine`

Rendering engine: `canvas` or `webgl` (experimental).

type: `enum('canvas'|'webgl')`
defaultValue: `"canvas"`


##### `font`

Font of the sequence labels, e.g. `20px Arial`

type: `string`
defaultValue: `"12px Arial"`


##### `height`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`


##### `markerSteps`

At which steps the position labels should appear, e.g. `2` for (1, 3, 5)

type: `number`
defaultValue: `2`


##### `msecsPerFps`

defaultValue: `60`


##### `msecsPerSecs`

Maximum number of frames per second, e.g. `1000 / 60`

type: `number`


##### `startIndex`

At which number the PositionBar marker should start counting.
Typical values are: `1` (1-based indexing) and `0` (0-based indexing).

type: `number`
defaultValue: `1`


##### `style`

Custom style configuration.

type: `object`


##### `width`

Width of the component (in pixels), e.g. `100`

type: `number`
defaultValue: `100`


### `SequenceOverview` (component)



#### Props

##### `height`

Height of the SequenceOverview (in pixels), e.g. `50`

type: `number`
defaultValue: `50`


##### `tileHeight`

Height of a tile in the OverviewBar, e.g. `5`

type: `number`
defaultValue: `5`


##### `tileWidth`

Width of a tile in the OverviewBar, e.g. `5`

type: `number`
defaultValue: `5`


### `SequenceViewer` (component)



#### Props

##### `showModBar`

defaultValue: `true`

Development
-----------

### Getting started

Get the code:

```
git clone https://github.com/plotly/react-msa-viewer
```

Install the project `dev` dependencies:

```
yarn install
```

Contributing
------------

Please, see the [CONTRIBUTING](CONTRIBUTING.md) file.

Contributor Code of Conduct
---------------------------

Please note that this project is released with a [Contributor Code of
Conduct](http://contributor-covenant.org/). By participating in this project you
agree to abide by its terms. See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) file.

License
-------

react-msa-viewer is released under the MIT License. See the bundled
[LICENSE](LICENSE) file for details.
