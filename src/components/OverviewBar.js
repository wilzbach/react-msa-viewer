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

const MSAStats = require('stat.seqs');

class OverviewBarComponent extends Component {

  constructor(props) {
    super(props);
    this.canvas = createRef();
    this.draw = throttle(this.draw, this.props.viewpoint.msecsPerFps);
    this.calculateStats();
  }

  componentDidMount() {
    this.ctx = new Canvas(this.canvas.current);
    this.draw();
  }

  componentDidUpdate() {
    this.calculateStats();
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
			let height = this.props.height * this.columnHeights[i];
			const remainingHeight = this.props.height - height;
      this.ctx.fillStyle(this.props.fillColor);
      this.ctx.fillRect(xPos, yPos + remainingHeight, tileWidth, height);
      xPos += this.props.viewpoint.tileSizes[0];
    }
    this.ctx.endDrawingFrame();
  }

  // TODO: do smarter caching here
  calculateStats() {
    const stats = MSAStats(this.props.sequences.map(e => e.sequence));
    this.columnHeights = [];
    switch (this.props.method) {
      case "conservation":
        this.columnHeights = stats.scale(stats.conservation());
        break;
      case "information-content":
        this.columnHeights = stats.scale(stats.ic());
        break;
      default:
        console.error(this.props.method + "is an invalid aggregation method for <OverviewBar />");
    }
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

OverviewBarComponent.defaultProps = {
  height: 50,
  fillColor: "#999999",
  method: "conservation",
}

OverviewBarComponent.PropTypes = {
  /**
   * Method to use for the OverviewBar:
   *  - `information-content`: Information entropy after Shannon of a column (scaled)
   *  - `conservation`: Conservation of a column (scaled)
   */
  method: PropTypes.oneOf('information-content', 'conservation'),

  /**
   * Height of the OverviewBar (in pixels), e.g. `100`
   */
  height: PropTypes.number,

  /**
   * Fill color of the OverviewBar, e.g. `#999999`
   */
  fillColor: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    sequences: state.sequences.raw,
    position: state.position,
    viewpoint: state.viewpoint,
  }
}

export default msaConnect(
  mapStateToProps,
  //mapDispatchToProps
)(OverviewBarComponent);
