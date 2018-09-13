import * as types from './actionTypes'

export const updateViewpoint = view => ({
  type: types.VIEWPOINT_POSITION_UPDATE,
  position: {
    xPos: view.xPos,
    yPos: view.yPos,
  }
});
