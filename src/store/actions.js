import * as types from './actionTypes'

export const updatePosition = view => ({
  type: types.POSITION_UPDATE,
  position: {
    xPos: view.xPos,
    yPos: view.yPos,
  }
});

export const updateViewpoint = data => ({
  type: types.VIEWPOINT_UPDATE,
  viewpoint: data,
});

export const updateUI = data => ({
  type: types.UI_UPDATE,
  ui: data,
});

export const updateSequences = data => ({
  type: types.SEQUENCES_UPDATE,
  sequences: data,
});
