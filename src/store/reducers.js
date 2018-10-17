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
import {ColorScheme, isColorScheme} from '../utils/ColorScheme';

const position = (state = {}, action) => {
  switch(action.type){
    case types.POSITION_UPDATE:
      return action.position;
    default:
      return state;
  }
}

function checkColorScheme(state) {
  if (isColorScheme(state.colorScheme)) {
      // it's already a color scheme
    } else {
      state.colorScheme = new ColorScheme(state.colorScheme);
  }
}

const props = (state = {}, action) => {
  switch(action.type){
    case types.PROPS_UPDATE:
      state = {
        ...state,
        [action.key]: action.value
      };
      if (action.key === "colorScheme") {
        checkColorScheme(state);
      }
      return state;
    default:
      if (state.colorScheme !== undefined) {
        checkColorScheme(state);
      }
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
