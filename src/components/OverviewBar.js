import React, { Component } from 'react';
import { connect } from 'react-redux'

import { throttle } from 'lodash';

import propsToRedux from '../store/propsToRedux';

import Canvas from '../drawing/canvas';

class OverviewBarComponent extends Component {

  static defaultProps = {
    height: 50,
    fillColor: "#999999",
  }

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.draw = throttle(this.draw, this.props.viewpoint.msecsPerFps);
  }

  componentDidMount() {
    this.ctx = new Canvas(this.canvas.current);
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    this.ctx.startDrawingFrame();
    this.ctx.font(this.props.viewpoint.positionFont);

    const tileWidth = this.props.viewpoint.tileSizes[0];
    const yPos = 0;
    const startTile = Math.floor(this.props.position.xPos / tileWidth);
    const tiles = Math.ceil(this.props.viewpoint.width / tileWidth) + 1;
    let xPos = -this.props.position.xPos % tileWidth;
    for (let i = startTile; i < (startTile + tiles); i++) {
			let height = this.props.height * this.props.columnHeights[i];
			const remainingHeight = this.props.height - height;
      this.ctx.fillStyle(this.props.fillColor);
      this.ctx.fillRect(xPos, yPos + remainingHeight, tileWidth, height);
      xPos += this.props.viewpoint.tileSizes[0];
    }
    this.ctx.endDrawingFrame();
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.viewpoint.width}
        height={this.props.height}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
    columnHeights: state.sequences.columns,
  }
}

const WrappedOverviewBar = connect(
  mapStateToProps,
  //mapDispatchToProps
)(OverviewBarComponent);

const OverviewBar = propsToRedux(WrappedOverviewBar);
export default OverviewBar;
