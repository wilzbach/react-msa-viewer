/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import PropTypes from 'prop-types';

/**
 * Definition of a single sequence object.
 *   name: label or id of the sequence (doesn't need to be unique)
 *   sequence: raw sequence data (e.g. AGAAAA)
 */
export const SequencePropType = PropTypes.shape({
  name: PropTypes.string,
  sequence: PropTypes.string,
})

export const AllowedColorschemes = [
  "buried_index", "clustal", "clustal2", "cinema",
  "helix_propensity", "hydro",
  "lesk", "mae", "nucleotide", "purine_pyrimidine",
  "strand_propensity", "taylor", "turn_propensity", "zappo",
];

export const ColorSchemePropType = PropTypes.oneOf(AllowedColorschemes);

export const PositionPropType = PropTypes.shape({
  xPos: PropTypes.number,
  yPos: PropTypes.number,
})

export const MSAPropTypes = {
  /**
   * Sequence data.
   */
  sequences: PropTypes.arrayOf(SequencePropType).isRequired,

  /**
   * Width of the sequence viewer (in pixels), e.g. `500`.
   */
  width: PropTypes.number,

  /**
   * Height of the sequence viewer (in pixels), e.g. `500`.
   */
  height: PropTypes.number,

  /**
   * Width of the main tiles (in pixels), e.g. `20`
   */
  tileWidth: PropTypes.number,

  /**
   * Height of the main tiles (in pixels), e.g. `20`
   */
  tileHeight: PropTypes.number,

  /**
   * Font of the individual residue tiles, e.g. `"20px Arial"`.
   */
  tileFont: PropTypes.string,

  /**
   * Maximum number of frames per second, e.g. `10000 / 60`.
   */
  msecsPerFps: PropTypes.number,

  /**
   * Current x and y position of the viewpoint
   * in the main sequence viewer (in pixels).
   * This specifies the position of the top-left corner
   * of the viewpoint within the entire alignment,
   * e.g. `{xPos: 20, yPos: 5}`.
   */
  position: PositionPropType,

  /**
   * Colorscheme to use. Currently the follow colorschemes are supported:
   * `buried_index`, `clustal`, `clustal2`, `cinema`, `helix_propensity`, `hydro`,
   *`lesk`, `mae`, `nucleotide`, `purine_pyrimidine`, `strand_propensity`, `taylor`,
   * `turn_propensity`, and `zappo`.
   *
  * See [msa-colorschemes](https://github.com/wilzbach/msa-colorschemes) for details.
  */
  colorScheme: ColorSchemePropType,

  /**
   * Background color to use, e.g. `red`
   */
  backgroundColor: PropTypes.string,

  /**
   * Rendering engine: `canvas` or `webgl` (experimental).
   */
  engine: PropTypes.oneOf(['canvas', 'webl']), // experimental
};


// TODO: separate individual properties into their components
export const msaDefaultProps = {
  width: 500,
  height: 100,
  tileWidth: 20,
  tileHeight: 20,
  tileFont: "20px Arial",
  msecsPerFps: 1000  / 60,
  position: {
    xPos: 0,
    yPos: 0,
  },
  colorScheme: "clustal",
  backgroundColor: "red",
  engine: "canvas", // experimental
};

export {PropTypes};
