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
    ];
    viewpoint: {
      height: 60,
    },
    ui: {
      colorscheme: "zappo",
    }
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

Props
-----

__Warning__: these properties are still suspectible to a _change at any moment_.

### `sequences` (required)

`sequences` expects an array of individual sequences.
Example:

```js
const sequences = [
  {
    name: "seq.1",
    sequence: "MEEPQSDPSIEP-PLSQETFSDLWKLLPENNVLSPLPS-QA-VDDLMLSPDDLAQWLTED",
  },
  {
    name: "seq.2",
    sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP",
  },
];
```

#### `sequence` (required)

Raw sequence, e.g. `MEEPQSDPSIEP`

#### `name`

Name of the sequence, e.g. `Sequence X`

### `ui` (optional)

The `ui` can be customized with:

#### `color`

TODO.

#### `scheme`

Colorscheme to use. Currently the follow colorschemes are supported:
`buried_index`, `clustal`, `clustal2`, `cinema`, `helix_propensity`, `hydro`,
`lesk`, `mae`, `nucleotide`, `purine_pyrimidine`, `strand_propensity`, `taylor`,
`turn_propensity`, and `zappo`.

See [msa-colorschemes](https://github.com/wilzbach/msa-colorschemes) for details.

### `viewpoint` (optional)

#### `width`

Width of the sequence viewer (in pixels), e.g. `500`.

#### `height`

Height of the sequence viewer (in pixels), e.g. `100`.

#### `tileSizes`

Width and height of the sequence viewer tiles (in pixels), e.g. `[20, 20]`.

#### `overviewTileSizes`

Width and height of the sequence viewer tiles (in pixels), e.g. `[5, 5]`.

#### `tileFont`

Font of the individual residue tiles, e.g. `"20px Arial"`.

#### `labelFont`

Font of the sequence labels, e.g. `"20px Arial"`.

#### `markerFont`

Font of the position markers, e.g. `"12px Arial"`.

#### `markerHeight`

Height of the position marker (in pixels), e.g. `15`.

#### `position`

Current x and y position of the viewpoint in the main sequence viewer (in pixels).
This specifies the position of the top-left corner of the viewpoint within the
entire alignment, e.g. `{xPos: 20, yPos: 5}`.

#### `msecsPerFps`

Maximum number of frames per second, e.g. `10000 / 60`.

#### `overviewBar`

Styling for the `OverviewBar` component.

##### `fillColor`

Fill color of the plot's bars, e.g. `#999999`.

##### `height`

Maximal height of the overview bar (in pixels), e.g. `50`.

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
