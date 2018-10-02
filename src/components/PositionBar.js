import React, { Component } from 'react';
import { connect } from 'react-redux'

import { throttle } from 'lodash';

import propsToRedux from '../store/propsToRedux';

import Canvas from '../drawing/canvas';

/**
TODO:
- buffer to animation frame
- make styling flexible
*/

class PositionBarComponent extends Component {

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
    this.ctx.font(this.props.viewpoint.markerFont);

    const [tileWidth, tileHeight] = this.props.viewpoint.tileSizes;
    const yPos = 0;
    const startTile = Math.floor(this.props.position.xPos / tileWidth);
    const tiles = Math.ceil(this.props.viewpoint.width / tileWidth) + 1;
    let xPos = -this.props.position.xPos % tileWidth;
    for (let i = startTile; i < (startTile + tiles); i++) {
      if (i % 2 === 0) {
        this.ctx.fillText(i, xPos, yPos, tileWidth, tileHeight);
      } else {
        this.ctx.fillText(".", xPos, yPos, tileWidth, tileHeight);
      }
      xPos += this.props.viewpoint.tileSizes[0];
    }
    this.ctx.endDrawingFrame();
  }

  render() {
    const style = {
      display: "block",
    };
		const height = this.props.viewpoint.markerHeight * 1 + 2;
    return (
      <canvas
        ref={this.canvas}
        width={this.props.viewpoint.width}
        height={height}
				style={style}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
    maxLength: state.sequences.maxLength,
  }
}

export default propsToRedux(connect(
  mapStateToProps,
)(PositionBarComponent));
