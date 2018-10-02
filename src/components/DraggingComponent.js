import React, { Component } from 'react';

import {
  throttle,
} from 'lodash';
import Mouse from '../utils/mouse';
import Canvas from '../drawing/canvas';
import WebGL from '../drawing/webgl';

/**
Provides dragging support in a canvas for sub-classes.
Sub-classes are expected to implement:
- drawScene
- onPositionUpdate(oldPos, newPos)

Moreover, a component's viewpoint needs to be passed in via its properties:

  <MyDraggingComponent viewpoint={width: 200, height: 300, msecsPerFps: 60} />
*/
// TODO: handle wheel events
// TODO: share requestAnimationFrame with multiple components
class DraggingComponent extends Component {

  /**
   * The internal state is kept in:
   *
   * this.mouseMovePosition = [x, y]; // relative to the canvas
   * this.touchMovePosition = [x, y]; // relative to the canvas
   *
   * If no movement is happening, these two variables are undefined.
   */

  static defaultProps = {
    viewpoint: {
      width: 500,
      height: 500,
      msecsPerFps: 60,
    },
    ui: {
      engine: "canvas",
    }
  }

  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    //this.onMouseMove = throttle(this.onMouseMove, msecsPerFps);
    //this.onTouchMove = throttle(this.onTouchMove, msecsPerFps);

    // just in case requestAnimationFrame is too greedy
    this.draw = throttle(this.draw, this.props.viewpoint.msecsPerFps);

    this.onViewpointChange();
    this.state = {
      cursorState: "grab",
    };
    this.mouseMovePosition = undefined;
    this.touchMovePosition = undefined;
  }

  /**
   * Called on every movement to rerender the canvas.
   */
  drawScene() {
    console.warn("drawScene is unimplemented.");
  }

  /**
   * Called on every position update.
   */
  onPositionUpdate() {
    console.warn("onPositionUpdate is unimplemented.");
  }

  /**
    * Called every time when the component's dimensions change.
    */
  onViewpointChange() {
    // no work is necessary anymore
  }

  componentDidMount() {
    // choose the best engine
    if (this.props.ui.engine === "webgl" && WebGL.isSupported(this.canvas.current)) {
      this.ctx = new WebGL(this.canvas.current);
    } else {
      this.ctx = new Canvas(this.canvas.current);
    }
    this.draw();
    window.addEventListener('resize', this.onResize)
    this.canvas.current.addEventListener('mousedown', this.onMouseDown);
    this.canvas.current.addEventListener('mouseout', this.onMouseOut);
    this.canvas.current.addEventListener('mouseup', this.onMouseUp);
    this.canvas.current.addEventListener('touchstart', this.onTouchStart);
    this.canvas.current.addEventListener('touchend', this.onTouchEnd);
    this.canvas.current.addEventListener('touchcancel', this.onTouchCancel);
    this.canvas.current.addEventListener('click', this.onMove);
  }

  draw = () => {
    // TODO: only update this if required
    this.ctx.startDrawingFrame();
    this.ctx.save();
    this.onViewpointChange();
    this.drawScene();
    this.ctx.restore();
    this.ctx.endDrawingFrame();
  }

  dragLoop = () => {
    this.draw();
    this.dragFrame = window.requestAnimationFrame(this.dragLoop)
  }

  onResize = (e) => {
    // TODO: move into the wrapper
    // TODO: only send a resize event once when triggered from multiple connected components
    console.log("resize", e);
  }

  onMouseDown = (e) => {
    this.canvas.current.addEventListener('mousemove', this.onMouseMove);
    //console.log("mousedown", e);
    this.startDragPhase(e);
  }

  onMouseMove = (e) => {
    //console.log("mousemove", e);
    const pos = Mouse.abs(e);
    // TODO: use global window out and not this container's out for better dragging
    if (!this.isEventWithinComponent(e)) {
      this.stopDragPhase();
      return;
    }
    this.onPositionUpdate(this.mouseMovePosition, pos);
    this.mouseMovePosition = pos;
  }

  onMouseUp = () => {
    this.stopDragPhase();
  }

  onMouseOut = () => {
    // TODO: use global window out and not this container's out for better dragging
    this.stopDragPhase();
  }

  onTouchStart = (e) => {
    this.canvas.current.addEventListener('touchmove', this.onTouchMove);
    console.log("touchstart", e);
    this.startDragPhase(e);
  }

  onTouchMove = (e) => {
    console.log("touchmove", e);
    // TODO: can call mouse move with changedTouches[$-1], but it's reversed moving
    this.onMouseMove(e);
  }

  onTouchEnd = () => {
    this.stopDragPhase();
  }

  onTouchCancel = () => {
    this.stopDragPhase();
  }

  /**
   * Called at the start of a drag action.
   */
  startDragPhase(e) {
    this.mouseMovePosition = Mouse.abs(e);
    if(!this.dragFrame) {
      this.dragFrame = window.requestAnimationFrame(this.dragLoop);
    }
    this.setState({
      cursorState: "grabbing"
    });
  }

  /**
   * Called at the end of a drag action.
   */
  stopDragPhase() {
    this.canvas.current.removeEventListener('mousemove', this.onMouseMove);
    this.mouseMovePosition = undefined;
    this.canvas.current.removeEventListener('touchmove', this.onTouchMove);
    this.touchMovePosition = undefined;
    window.cancelAnimationFrame(this.dragFrame);
    this.dragFrame = null;
    this.setState({
      cursorState: "grab"
    });
  }

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

  /**
   * Unregisters all event listeners and stops the animations.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mouseout', this.onMouseOut);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchcancel', this.onTouchCancel);
    this.stopDragPhase();
  }

  render() {
    // TODO: adapt to parent height/width
    const style = {
      cursor: this.state.cursorState,
      display: "block",
    };
    return (
      <canvas
        ref={this.canvas}
        width={this.props.viewpoint.width}
        height={this.props.viewpoint.height}
        style={style}
      >
      Your browser does not seem to support HTML5 canvas.
      </canvas>
    );
  }
}

export default DraggingComponent;
