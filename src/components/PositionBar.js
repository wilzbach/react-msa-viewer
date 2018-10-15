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

/**
TODO:
- buffer to animation frame
- make styling flexible
*/

class PositionBarComponent extends Component {

  constructor(props) {
    super(props);
    this.canvas = createRef();
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
    this.ctx.font(this.props.font);

    const [tileWidth, tileHeight] = this.props.viewpoint.tileSizes;
    const yPos = 0;
    const startTile = Math.floor(this.props.position.xPos / tileWidth) - 1 + this.props.startIndex;
    const tiles = Math.ceil(this.props.viewpoint.width / tileWidth) + 1;
    let xPos = -this.props.position.xPos % tileWidth;
    for (let i = startTile; i < (startTile + tiles); i++) {
      if (i % this.props.markerSteps === 0) {
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
		const height = this.props.height * 1 + 2;
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

PositionBarComponent.defaultProps = {
  font: "12px Arial",
  height: 15,
  markerSteps: 2,
  startIndex: 1,
};

PositionBarComponent.PropTypes = {
  /**
   * Font of the sequence labels, e.g. `20px Arial`
   */
  font: PropTypes.string,

  /**
   * Height of the PositionBar (in pixels), e.g. `100`
   */
  height: PropTypes.number,

  /**
   * At which steps the position labels should appear, e.g. `2` for (1, 3, 5)
   */
  markerSteps: PropTypes.number,

  /**
   * At which number the PositionBar marker should start counting.
   * Typical values are: `1` (1-based indexing) and `0` (0-based indexing).
   */
  startIndex: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
    maxLength: state.sequences.maxLength,
  }
};

export default msaConnect(
  mapStateToProps,
)(PositionBarComponent);
