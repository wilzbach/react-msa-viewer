import PropTypes from 'prop-types';

import { createStore } from 'redux'

import { merge } from 'lodash';

import { MSAPropTypes, msaDefaultProps } from '../PropTypes';

import positionReducers from '../store/reducers';
import calculateSequencesState from './calculateSequencesState';

/**
Initializes a new MSAViewer store-like structure.
For performance reasons, the frequently changing position information
has its own redux store.
The default properties from MSAViewer.defaultProps are used.
*/
export const createMSAStore = (props) => {
  PropTypes.checkPropTypes(MSAPropTypes, props, 'prop', 'MSAViewer');
  props = merge(msaDefaultProps, props);
  // move sequences in its own sub-object
  props.sequences = calculateSequencesState(props.sequences);
  return createStore(positionReducers, props);
}

export default createMSAStore;
