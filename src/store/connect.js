/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import { connect } from 'react-redux';

import { storeKey } from './storeOptions';

function msaConnect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  options.storeKey = storeKey;
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, options);
}

export default msaConnect;
