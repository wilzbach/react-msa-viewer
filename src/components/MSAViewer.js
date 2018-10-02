import React, { Component } from 'react';

import PositionBar from './PositionBar';
import SequenceViewer from './SequenceViewer';
import SequenceOverview from './SequenceOverview';
import OverviewBar from './OverviewBar';
import Labels from './Labels';

import propsToRedux from '../store/propsToRedux';

const labelsAndSequenceDiv = {
  display: "flex",
};

// TODO: support changing the store dynamically
// TODO: when props of children update -> update store
// TODO: support using the child components in stand-alone mode
class MSAViewerComponent extends Component {

  // TODO for local development
  //componentDidCatch(error, info) {
  //}

  render() {
    const labelsPadding = this.props.store.getState().viewpoint.tileSizes[1];
    const overviewBarHeight = 50;
    const labelsStyle = {
      paddingTop: labelsPadding + overviewBarHeight,
    }
    return (
      <div>
        <div style={labelsAndSequenceDiv}>
          <Labels
            store={this.props.store}
            style={labelsStyle}
          />
          <div>
            <OverviewBar
              store={this.props.store}
              height={overviewBarHeight}
            />
            <PositionBar
              store={this.props.store}
            />
            <SequenceViewer
              store={this.props.store}
            />
            <br />
            <SequenceOverview
              store={this.props.store}
            />
          </div>
        </div>
      </div>
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
