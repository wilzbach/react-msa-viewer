/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import {
  reduce,
} from 'lodash-es';

const calculateSequencesState = (sequences) => {
  const state = {
    raw: sequences
  };
  state.maxLength = reduce(sequences, (m, e) => Math.max(m, e.sequence.length), 0);
  return state;
}
export default calculateSequencesState;
