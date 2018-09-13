import * as types from './actionTypes'

import { combineReducers } from 'redux'

const defaultViewpoint = {
  width: -1,
  height: -1,
  tileSizes: [20, 20],
  fontSize: "",
}

// reducers
const viewpoint = (state = defaultViewpoint, action) => {
  switch(action.type){
    //case types.VIEWPOINT_POSITION_UPDATE:
      //return {
        //...state,
        //xPos: action.view.xPos,
        //yPos: action.view.yPos,
      //};
    default:
      return state;
  }
}

const position = (state = {xPos: 0, yPos: 0}, action) => {
  switch(action.type){
    case types.VIEWPOINT_POSITION_UPDATE:
      return {...action.position};
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
    //case types.VIEWPOINT_POSITION_UPDATE:
      //return state;
    default:
      return state;
  }
}

const sequences = (state = {raw: []}, action) => {
  switch(action.type){
    //case types.VIEWPOINT_POSITION_UPDATE:
      //break;
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
