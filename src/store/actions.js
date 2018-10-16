/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import * as types from './actionTypes'

export const updatePosition = view => ({
  type: types.POSITION_UPDATE,
  position: {
    xPos: view.xPos,
    yPos: view.yPos,
  }
});

export const updateProps = data => ({
  type: types.PROPS_UPDATE,
  key: data.key,
  value: data.value,
});

export const updateSequences = data => ({
  type: types.SEQUENCES_UPDATE,
  sequences: data,
});
