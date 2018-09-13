import React, { Component, Fragment } from 'react';

import PositionBar from './PositionBar';
import SequenceViewer from './SequenceViewer';
import OverviewBar from './OverviewBar';

import propsToRedux from '../store/propsToRedux';

// TODO: support changing the store dynamically
// TODO: when props of children update -> update store
// TODO: support using the child components in stand-alone mode
class MSAViewerComponent extends Component {

  // TODO for local development
  //componentDidCatch(error, info) {
  //}

  render() {
    return (
      <Fragment>
        <PositionBar
          store={this.props.store}
        />
        <SequenceViewer
          store={this.props.store}
        />
        <OverviewBar
          store={this.props.store}
        />
      </Fragment>
    );
  }
}

const MSAViewer = propsToRedux(MSAViewerComponent);

export default MSAViewer;
export {
  MSAViewer,
  SequenceViewer,
  PositionBar,
};
