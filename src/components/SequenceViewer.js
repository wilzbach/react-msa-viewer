import React, { Component } from 'react';
import { connect } from 'react-redux'

//import {
  //MSAPropTypes
//} from '../PropTypes';

import { updateViewpoint } from '../store//actions'
import propsToRedux from '../store/propsToRedux';

import { throttle, floor, clamp } from 'lodash';
import Mouse from '../utils/mouse';
import Canvas from '../drawing/canvas';
import WebGL from '../drawing/webgl';

// TODO: maybe move into the store
const schemes = new (require('msa-colorschemes'))();

class SequenceViewerComponent extends Component {

  static fps = 120;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    //this.handleMouseMove = throttle(this.handleMouseMove, msecsPerFps);
    //this.handleTouchMove = throttle(this.handleTouchMove, msecsPerFps);
    this.draw = throttle(this.draw, this.props.viewpoint.msecsPerFps);
    // TODO: maybe requestAnimationFrame

    this.updateScreen();
    this.state = {
      cursorState: "grab",
    };
  }

  updateScreen() {
    // TODO: maybe it's better to just use the props
    //this.viewpoint.width = Math.max(50, this.props.viewpoint.width);
    //this.viewpoint.height = Math.max(50, this.props.viewpoint.height);
  }

  componentDidMount() {
    if (this.props.ui.engine === "webgl" && WebGL.isSupported(this.canvas.current)) {
      this.ctx = new WebGL(this.canvas.current);
    } else {
      this.ctx = new Canvas(this.canvas.current);
    }
    this.draw();
    window.addEventListener('resize', this.handleResize)
    this.canvas.current.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.current.addEventListener('mouseout', this.handleMouseOut);
    this.canvas.current.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.current.addEventListener('touchstart', this.handleTouchStart);
    this.canvas.current.addEventListener('touchend', this.handleTouchEnd);
    this.canvas.current.addEventListener('touchcancel', this.handleTouchCancel);
    this.canvas.current.addEventListener('click', this.handleMove);
  }

  draw = () => {
    // TODO: only update this if required
    this.ctx.startDrawingFrame();
    this.ctx.save();
    // TODO: only update the scheme when it changed (maybe move i
    this.scheme = schemes.getScheme(this.props.ui.scheme);
    this.updateScreen();
    this.drawSequences();
    this.ctx.restore();
    this.ctx.endDrawingFrame();
  }

  dragLoop = () => {
    this.draw();
    this.dragFrame = window.requestAnimationFrame(this.dragLoop)
  }

  drawSequences() {
    const sequences = this.props.sequences.raw;
    const viewpoint = this.props.viewpoint;
    const [xSize, ySize] = viewpoint.tileSizes;
    const {xPos: xViewPos, yPos: yViewPos} = this.props.position;
    const xInitPos = -(xViewPos % xSize);
    let xPos = xInitPos, yPos = -(yViewPos % ySize);
    // TODO: move into the reducer
    let i = clamp(floor(yViewPos / ySize), 0, sequences.length - 1);
    for (; i < sequences.length; i++) {
      const sequence = sequences[i].sequence;
      let j = clamp(floor(xViewPos / xSize), 0, sequence.length - 1);
      for (; j < sequence.length; j++) {
        const el = sequence[j];
        this.ctx.font(this.props.viewpoint.fontSize);
        this.ctx.fillStyle(this.scheme.getColor(el));
        this.ctx.globalAlpha(0.7);
        this.ctx.fillRect(xPos, yPos, xSize, ySize);
        this.ctx.fillStyle("#000000");
        this.ctx.globalAlpha(1.0);
        // TODO: cache the font tile
        // TODO: center the font tile
        this.ctx.fillText(el, xPos, yPos);
        xPos += xSize;
        if (xPos > viewpoint.width)
            break;
      }
      xPos = xInitPos;
      yPos += ySize;
      if (yPos > viewpoint.height)
          break;
    }
  }

  handleResize = (e) => {
    // TODO: move into the wrapper
    // TODO: only send a resize event once when triggered from multiple connected components
    console.log("resize", e);
  }

  handleMouseDown = (e) => {
    this.canvas.current.addEventListener('mousemove', this.handleMouseMove);
    //console.log("mousedown", e);
    this.startDragPhase(e);
  }

  updateViewpoint(oldPos, newPos) {
    // TODO: move this into a redux action
    const pos = this.props.position;
    const viewpoint = this.props.viewpoint;
    pos.xPos += oldPos[0] - newPos[0];
    pos.yPos += oldPos[1] - newPos[1];
    // TODO: need maxium of sequence lengths here
    const maximum = this.props.sequences.maxLength;
    pos.xPos = clamp(pos.xPos, 0, maximum * viewpoint.tileSizes[0] - viewpoint.width);
    pos.yPos = clamp(pos.yPos, 0,
      this.props.sequences.length * viewpoint.tileSizes[1] - viewpoint.height);
    this.props.updateViewpoint(pos);
  }

  handleMouseMove = (e) => {
    //console.log("mousemove", e);
    const pos = Mouse.abs(e);
    // TODO: use global window out and not this container's out for better dragging
    if (!this.isEventWithinComponent(e)) {
      this.stopDragPhase();
      return;
    }
    this.updateViewpoint(this.mouseMovePosition, pos);
    this.mouseMovePosition = pos;
  }

  handleMouseUp = () => {
    this.stopDragPhase();
  }

  handleMouseOut = () => {
    // TODO: use global window out and not this container's out for better dragging
    this.stopDragPhase();
  }

  handleTouchStart = (e) => {
    this.canvas.current.addEventListener('touchmove', this.handleTouchMove);
    console.log("touchstart", e);
    this.startDragPhase(e);
  }

  handleTouchMove = (e) => {
    console.log("touchmove", e);
    // TODO: can call mouse move with changedTouches[$-1], but it's reversed moving
    this.handleMouseMove(e);
  }

  handleTouchEnd = () => {
    this.stopDragPhase();
  }

  handleTouchCancel = () => {
    this.stopDragPhase();
  }

  startDragPhase(e) {
    this.mouseMovePosition = Mouse.abs(e);
    if(!this.dragFrame) {
      this.dragFrame = window.requestAnimationFrame(this.dragLoop);
    }
    this.setState({
      cursorState: "grabbing"
    });
  }

  stopDragPhase() {
    this.canvas.current.removeEventListener('mousemove', this.handleMouseMove);
    this.mouseMovePosition = [-1, -1];
    this.canvas.current.removeEventListener('touchmove', this.handleTouchMove);
    this.touchMovePosition = [-1, -1];
    window.cancelAnimationFrame(this.dragFrame);
    this.dragFrame = null;
    this.setState({
      cursorState: "grab"
    });
  }

  // TODO: handle wheel events

  isEventWithinComponent(e) {
    // TODO: cache width + height for the rel call
    const relPos = Mouse.rel(e);
    return 0 <= relPos[0] && relPos[0] <= this.props.viewpoint.width &&
           0 <= relPos[1] && relPos[1] <= this.props.viewpoint.height;
  }

  componentDidUpdate() {
    // TODO: smarter updates
    this.draw();
  }

  //shouldComponentUpdate(newProps) {
    //// TODO: check recursively
    ////return this.props.target !== newProps.target;
    //return true;
  //}

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mouseout', this.handleMouseOut);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('click', this.handleClick);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchcancel', this.handleTouchCancel);
    this.stopDragPhase();
  }

  render() {
    // TODO: adapt to parent height/width
    return (
      <canvas
        ref={this.canvas}
        width={this.props.viewpoint.width}
        height={this.props.viewpoint.height}
        style={{cursor: this.state.cursorState}}
      >
      Your browser does not seem to support HTML5 canvas.
      </canvas>
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    viewpoint: state.viewpoint,
    sequences: state.sequences,
    ui: state.ui,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateViewpoint: (view) => dispatch(updateViewpoint(view)),
  }
}

const WrappedSequenceViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SequenceViewerComponent);

const SequenceViewer = propsToRedux(WrappedSequenceViewer);
export default SequenceViewer;

