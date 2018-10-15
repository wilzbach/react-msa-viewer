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

export const ViewpointPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  tileWidth: PropTypes.number,
  tileHeight: PropTypes.number,
  tileFont: PropTypes.string,
});

export const UIPropType = PropTypes.shape({
    color: PropTypes.string,
    scheme: PropTypes.string,
    engine: PropTypes.string,
});


export const MSAPropTypes = {
  sequences: PropTypes.arrayOf(SequencePropType).isRequired,
  viewpoint: ViewpointPropType,
  ui: UIPropType,
};

// TODO: separate individual properties into their components
export const msaDefaultProps = {
  viewpoint: {
    width: 500,
    height: 100,
    tileSizes: [20, 20],
    tileFont: "20px Arial",
    position: {
      xPos: 0,
      yPos: 0,
    },
    msecsPerFps: 1000  / 60,
  },
  ui: {
    color: "red",
    scheme: "clustal",
    engine: "canvas",
  }
};

export {PropTypes};
