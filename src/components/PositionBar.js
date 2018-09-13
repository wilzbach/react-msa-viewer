import React, { Component } from 'react';
import { connect } from 'react-redux'

import { throttle } from 'lodash';

import propsToRedux from '../store/propsToRedux';

import Canvas from '../drawing/canvas';

/**
TODO:
- update on tile size/width changes
- update on msaviewer width changes
- buffer to animation frame
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
    let xPos = -this.props.position.xPos;
    let yPos = 0;
    this.ctx.font(this.props.viewpoint.fontSize);
    for (let i = 0; i <= this.props.maxLength; i++) {
      if (i % 2 === 0) {
        this.ctx.fillText(i, xPos, yPos);
      } else {
        this.ctx.fillText(".", xPos, yPos);
      }
      xPos += this.props.viewpoint.tileSizes[0];
    }
    this.ctx.endDrawingFrame();
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
    maxLength: state.sequences.maxLength,
  }
}

const WrappedPositionBar = connect(
  mapStateToProps,
)(PositionBarComponent);

const PositionBar = propsToRedux(WrappedPositionBar);
export default PositionBar;
