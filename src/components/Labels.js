/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { throttle } from 'lodash';

import propsToRedux from '../store/propsToRedux';

import Canvas from '../drawing/canvas';

class LabelsComponent extends Component {

  static defaultProps = {
    width: 80, // TODO: can we calculate this automatically?
    style: {display: "block"},
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
    const [,tileHeight] = this.props.viewpoint.tileSizes;
    this.ctx.startDrawingFrame();
    let xPos = 0;
    let yPos = -this.props.position.yPos + 3;
    this.ctx.font(this.props.viewpoint.labelSize);
    for (let i = 0; i < this.props.nrSequences; i++) {
      let label;
      if (this.props.labels[i]) {
        label = this.props.labels[i];
      } else {
        label = "Sequence " + i;
      }
      this.ctx.fillText(label, xPos, yPos, this.props.width, tileHeight);
      yPos += tileHeight;
    }
    this.ctx.endDrawingFrame();
  }

  render() {
    return (
      <div style={this.props.style}>
        <canvas
          ref={this.canvas}
          width={this.props.width}
          height={this.props.viewpoint.height}
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
    nrSequences: state.sequences.raw.length,
    labels: state.sequences.raw.map(s => s.name),
  }
}

export default propsToRedux(connect(
  mapStateToProps,
)(LabelsComponent));
