import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {throttle, floor, clamp, max} from 'lodash';
import Mouse from '../utils/mouse';

const schemes = new (require('msa-colorschemes'))();

const SequencePropType = PropTypes.shape({
  name: PropTypes.string,
  sequence: PropTypes.string,
})

const ViewpointType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
});

class MSAViewer extends Component {

  static propTypes = {
    color: PropTypes.string,
    scheme: PropTypes.string,
    sequences: PropTypes.arrayOf(SequencePropType).isRequired,
    sequences: ViewpointType,
  }

  static defaultProps = {
    color: "red",
    scheme: "clustal",
    viewpoint: {
      width: 500,
      height: 100,
    }
  }

  static fps = 60;

  constructor(props) {
    super(props);
    const msecsPerFps = 1000 / this.fps;
    this.canvas = React.createRef();
    this.handleMouseMove = throttle(this.handleMouseMove, msecsPerFps);
    this.handleTouchMove = throttle(this.handleTouchMove, msecsPerFps);
    this.draw = throttle(this.draw, msecsPerFps);

    this.viewpoint = {
      pos: [0, 0],
      tileSizes: [20, 20],
      width: this.props.viewpoint.width,
      height: this.props.viewpoint.height,
    };
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
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
    this.scheme = schemes.getScheme(this.props.scheme);
    this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    this.drawSequences();
  }

  drawSequences() {
    const [xSize, ySize] = this.viewpoint.tileSizes;
    const [xViewPos, yViewPos] = this.viewpoint.pos;
    const xInitPos = -(xViewPos % xSize);
    let xPos = xInitPos, yPos = -(yViewPos % ySize);
    let i = clamp(floor(yViewPos / ySize), 0, this.props.sequences.length - 1);
    for (; i < this.props.sequences.length; i++) {
      const sequence = this.props.sequences[i].sequence;
      let j = clamp(floor(xViewPos / xSize), 0, sequence.length - 1);
      for (; j < sequence.length; j++) {
        const el = sequence[j];
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = this.scheme.getColor(el);
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillRect(xPos, yPos, xSize, ySize);
        this.ctx.fillStyle = "#000000";
        this.ctx.globalAlpha = 1.0;
        // TODO: cache the font tile
        // TODO: center the font tile
        this.ctx.fillText(el, xPos + 2, yPos + 17);
        xPos += xSize;
        if (xPos > this.viewpoint.width)
            break;
      }
      xPos = xInitPos;
      yPos += ySize;
      if (yPos > this.viewpoint.height)
          break;
    }
  }

  handleResize = (e) => {
    console.log("resize", e);
  }

  handleMouseDown = (e) => {
    this.canvas.current.addEventListener('mousemove', this.handleMouseMove);
    this.mouseMovePosition = Mouse.abs(e);
    console.log("mousedown", e);
  }

  updateViewpoint(oldPos, newPos) {
    this.viewpoint.pos[0] += oldPos[0] - newPos[0];
    this.viewpoint.pos[1] += oldPos[1] - newPos[1];
    // TODO: need maxium of sequence lengths here
    const maximum = max(this.props.sequences.map(e => e.sequence.length));
    this.viewpoint.pos[0] = clamp(this.viewpoint.pos[0], 0, maximum * this.viewpoint.tileSizes[0] - this.viewpoint.width);
    this.viewpoint.pos[1] = clamp(this.viewpoint.pos[1], 0,
      this.props.sequences.length * this.viewpoint.tileSizes[1] - this.viewpoint.height);
    console.log(this.viewpoint.pos);
  }

  handleMouseMove = (e) => {
    console.log("mousemove", e);
    const pos = Mouse.abs(e);
    // TODO: use global window out and not this container's out for better dragging
    if (!this.isEventWithinComponent(e)) {
      this.stopDragPhase();
      return;
    }
    this.updateViewpoint(this.mouseMovePosition, pos);
    this.mouseMovePosition = pos;
    this.draw();
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
    this.touchMovePosition = Mouse.abs(e);
    // TODO: same behavior as in mouse move
  }

  handleTouchMove = (e) => {
    console.log("touchmove", e);
    // can call mouse move with changedTouches[$-1], but it's reversed moving
  }

  handleTouchEnd = () => {
    this.stopDragPhase();
  }

  handleTouchCancel = () => {
    this.stopDragPhase();
  }

  stopDragPhase() {
    this.canvas.current.removeEventListener('mousemove', this.handleMouseMove);
    this.mouseMovePosition = [-1, -1];
    this.canvas.current.removeEventListener('touchmove', this.handleTouchMove);
    this.touchMovePosition = [-1, -1];
  }

  // TODO: handle wheel events

  isEventWithinComponent(e) {
    // TODO: cache width + height for the rel call
    const relPos = Mouse.rel(e);
    return 0 <= relPos[0] && relPos[0] <= this.viewpoint.width &&
           0 <= relPos[1] && relPos[1] <= this.viewpoint.height;
  }

  componentDidUpdate() {
    // TODO: smarter updates
    this.draw();
  }

  shouldComponentUpdate(newProps) {
    // TODO: check recursively
    //return this.props.target !== newProps.target;
    return true;
  }

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
        width={this.viewpoint.width}
        height={this.viewpoint.height}
      >
      </canvas>
    );
  }
}

export {MSAViewer};
export default MSAViewer;
