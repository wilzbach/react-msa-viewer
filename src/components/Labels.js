/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React, { Component } from 'react';
import msaConnect from '../store/connect'
import PropTypes from 'prop-types';

import { throttle } from 'lodash-es';

import Canvas from '../drawing/canvas';

import createRef from 'create-react-ref/lib/createRef';

class LabelsComponent extends Component {

  static defaultProps = {
    width: 80, // TODO: can we calculate this automatically?
    style: {display: "block"},
  }

  constructor(props) {
    super(props);
    this.canvas = createRef();
    this.draw = throttle(this.draw, this.props.msecsPerFps);
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
    let xPos = 0;
    let yPos = -this.props.position.yPos + 3;
    this.ctx.font(this.props.font);
    for (let i = 0; i < this.props.nrSequences; i++) {
      let label;
      if (this.props.labels[i]) {
        label = this.props.labels[i];
      } else {
        label = "Sequence " + i;
      }
      this.ctx.fillText(label, xPos, yPos, this.props.width, this.props.tileHeight);
      yPos += this.props.tileHeight;
    }
    this.ctx.endDrawingFrame();
  }

  render() {
    return (
      <div style={this.props.style}>
        <canvas
          ref={this.canvas}
          width={this.props.width}
          height={this.props.globalHeight}
        >
        </canvas>
      </div>
    );
  }
}

LabelsComponent.PropTypes = {
  /**
   * Font of the sequence labels, e.g. `20px Arial`
   */
  font: PropTypes.string,

  /**
   * Width of the OverviewBar (in pixels), e.g. `100`
   */
  width: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    position: state.position,
    globalHeight: state.props.height,
    tileHeight: state.props.tileHeight,
    msecsPerFps: state.props.msecsPerFps,
    nrSequences: state.sequences.raw.length,
    labels: state.sequences.raw.map(s => s.name),
  }
}

export default msaConnect(
  mapStateToProps,
)(LabelsComponent);
