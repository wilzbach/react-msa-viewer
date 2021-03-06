/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import PropTypes from 'prop-types';

import { createStore } from 'redux'

import { merge } from 'lodash-es';

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
  const propsWithDefaultValues = merge({}, msaDefaultProps, props);
  const {sequences, position, ...otherProps} = propsWithDefaultValues;
  const customProps = {
    props: otherProps,
    position,
    sequences: calculateSequencesState(props.sequences),
  };
  return createStore(positionReducers, customProps);
}

export default createMSAStore;
