import React, { Component } from 'react';
import { connect } from 'react-redux'

import { throttle, floor, clamp } from 'lodash';

import propsToRedux from '../store/propsToRedux';

import Canvas from '../drawing/canvas';

const schemes = new (require('msa-colorschemes'))();

class SequenceOverviewComponent extends Component {

  static defaultProps = {
    height: 50,
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

  draw = () => {
    // TODO: only update this if required
    this.ctx.startDrawingFrame();
    this.ctx.save();
    // TODO: only update the scheme when it changed
    this.scheme = schemes.getScheme(this.props.ui.scheme);
    this.drawScene();
    this.ctx.restore();
    this.ctx.endDrawingFrame();
  }

  drawScene() {
    this.scene = {};
    this.scene.viewpoint = this.props.viewpoint;
    const [sequenceTileWidth, sequenceTileHeight] = this.props.viewpoint.tileSizes;
    ([this.scene.tileWidth, this.scene.tileHeight] = this.props.viewpoint.overviewTileSizes);
    ({xPos: this.scene.xViewPos, yPos: this.scene.yViewPos} = this.props.position);
    this.scene.xScalingFactor = 1 / sequenceTileWidth * this.scene.tileWidth;
    this.scene.yScalingFactor = 1 / sequenceTileHeight * this.scene.tileHeight;
    this.drawCurrentViewpoint();
    this.drawSequences();
  }

  drawSequences() {
    const {
      tileWidth, tileHeight,
      viewpoint,
      xViewPos, xScalingFactor,
    } = this.scene;
    const sequences = this.props.sequences.raw;
    const xInitPos = 0;
    //let yPos = -(yViewPos % tileHeight);
    // TODO: move into the reducer
    //let i = clamp(floor(yViewPos / tileHeight), 0, sequences.length - 1);
    let yPos = 0;
    let i = 0;

    // sequences themselves
    for (; i < sequences.length; i++) {
      const sequence = sequences[i].sequence;
      let xPos = xInitPos;
      let j = clamp(floor(xViewPos * xScalingFactor), 0, sequence.length - 1);
      j = 0;
      for (; j < sequence.length; j++) {
        const el = sequence[j];
        this.ctx.fillStyle(this.scheme.getColor(el));
        this.ctx.globalAlpha(0.5);
        this.ctx.fillRect(xPos, yPos, tileWidth, tileHeight);
        xPos += tileWidth;
        if (xPos > viewpoint.width)
            break;
      }
      yPos += tileHeight;
      if (yPos > viewpoint.height)
          break;
    }
  }

  drawCurrentViewpoint() {
    // currently selected area
    const {
      viewpoint,
      xViewPos, xScalingFactor,
      yViewPos, yScalingFactor,
    } = this.scene;
    this.ctx.globalAlpha(0.8);
    this.ctx.fillRect(
      xViewPos * xScalingFactor,
      yViewPos * yScalingFactor,
      viewpoint.width  * xScalingFactor,
      viewpoint.height * yScalingFactor,
    );
  }

  render() {
    const style = {
      display: "block",
    };
    return (
      <canvas
        ref={this.canvas}
        width={this.props.viewpoint.width}
        height={this.props.height}
        style={style}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
    ui: state.ui,
    sequences: state.sequences,
  }
}

export default propsToRedux(connect(
  mapStateToProps,
)(SequenceOverviewComponent));
