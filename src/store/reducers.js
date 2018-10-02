import * as types from './actionTypes'

import { combineReducers } from 'redux'

import calculateSequencesState from './calculateSequencesState';

const defaultViewpoint = {
  width: -1,
  height: -1,
  tileSizes: [20, 20],
  tileFont: "",
  labelFont: "",
  positionFont: "",
}

// TODO: maybe combine with UI?
const viewpoint = (state = defaultViewpoint, action) => {
  switch(action.type){
    case types.VIEWPOINT_UPDATE:
      return action.viewpoint;
    default:
      return state;
  }
}

const position = (state = {xPos: 0, yPos: 0}, action) => {
  switch(action.type){
    case types.POSITION_UPDATE:
      return action.position;
    default:
      return state;
  }
}

const defaultUI = {
  color: "red",
  scheme: "clustal",
  engine: "canvas",
};

const ui = (state = defaultUI, action) => {
  switch(action.type){
    case types.UI_UPDATE:
      return action.ui;
    default:
      return state;
  }
}

const sequences = (state = {raw: []}, action) => {
  switch(action.type){
    case types.SEQUENCES_UPDATE:
      return calculateSequencesState(action.sequences);
    default:
      return state;
  }
}

export const reducers = combineReducers({
  position,
  viewpoint,
  ui,
  sequences,
});
export default reducers;
