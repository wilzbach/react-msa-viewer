import { reduce } from 'lodash';

const calculateSequencesState = (sequences) => {
  const state = {raw: sequences};
  state.maxLength = reduce(sequences, (m, e) => Math.max(m, e.sequence.length), 0);
  return state;
}
export default calculateSequencesState;
