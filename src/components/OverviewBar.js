import React, { Component } from 'react';
import { connect } from 'react-redux'

import propsToRedux from '../store/propsToRedux';

class OverviewBarComponent extends Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvas}
          width={this.props.viewpoint.width}
          height={this.props.viewpoint.tileSizes[1]}
        >
        </canvas>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
  }
}

const WrappedOverviewBar = connect(
  mapStateToProps,
  //mapDispatchToProps
)(OverviewBarComponent);

const OverviewBar = propsToRedux(WrappedOverviewBar);
export default OverviewBar;
