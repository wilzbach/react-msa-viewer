/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import * as types from './actionTypes'

import { combineReducers } from 'redux'

import calculateSequencesState from './calculateSequencesState';

const position = (state = {}, action) => {
  switch(action.type){
    case types.POSITION_UPDATE:
      return action.position;
    default:
      return state;
  }
}

const props = (state = {}, action) => {
  switch(action.type){
    case types.PROPS_UPDATE:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

const sequences = (state = {}, action) => {
  switch(action.type){
    case types.SEQUENCES_UPDATE:
      return calculateSequencesState(action.sequences);
    default:
      return state;
  }
}

export const reducers = combineReducers({
  position,
  props,
  sequences,
});
export default reducers;
