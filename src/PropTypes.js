/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import PropTypes from 'prop-types';

export const SequencePropType = PropTypes.shape({
  name: PropTypes.string,
  sequence: PropTypes.string,
})

export const ViewpointPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  tileSizes: PropTypes.arrayOf(PropTypes.number), // TODO: check element size or use an object
  overviewTileSizes: PropTypes.arrayOf(PropTypes.number), // TODO: check element size or use an object
  tileFont: PropTypes.string,
  labelFont: PropTypes.string,
  markerFont: PropTypes.string,
  markerHeight: PropTypes.number,
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
    overviewTileSizes: [5, 5],
    tileFont: "20px Arial",
    labelFont: "20px Arial",
    markerFont: "12px Arial",
    markerHeight: "15",
    position: {
      xPos: 0,
      yPos: 0,
    },
    msecsPerFps: 1000  / 60,
    overviewBar: {
      height: 50,
      fillColor: "#999999",
    },
  },
  ui: {
    color: "red",
    scheme: "clustal",
    engine: "canvas",
  }
};
