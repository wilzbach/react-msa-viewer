import {
  reduce,
  times,
} from 'lodash';

const calculateSequencesState = (sequences) => {
  const state = {
    raw: sequences
  };
  state.maxLength = reduce(sequences, (m, e) => Math.max(m, e.sequence.length), 0);
  state.columns = times(state.maxLength, Math.random);
  return state;
}
export default calculateSequencesState;
