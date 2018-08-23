class Mouse {
  static rel = function(e) {
    let mouseX, mouseY, rect, target;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    if (mouseX === undefined) {
      rect = target.getBoundingClientRect();
      target = e.target || e.srcElement;
      if (mouseX === undefined) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
      if (mouseX === undefined) {
        mouseX = e.pageX - target.offsetLeft;
        mouseY = e.pageY - target.offsetTop;
      }
      if (mouseX === undefined) {
        console.log(e, "No mouse event defined.");
        return;
      }
    }
    return [mouseX, mouseY];
  }

  static abs = function(e) {
    let mouseX, mouseY;
    mouseX = e.pageX;
    mouseY = e.pageY;
    if (mouseX === undefined) {
      mouseX = e.layerX;
      mouseY = e.layerY;
    }
    if (mouseX === undefined) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    if (mouseX === undefined) {
      mouseX = e.x;
      mouseY = e.y;
    }
    return [mouseX, mouseY];
  }

  static wheelDelta = function(e) {
    let delta;
    delta = [e.deltaX, e.deltaY];
    if (delta[0] === undefined) {
      // in case there is a more detailed scroll sensor - use it
      if (e.mozMovementX) {
        delta = [0, e.mozMovementX];
      }
    }
    // safety first
    if (isNaN(delta[0])) {
      delta[0] = 0;
    }
    if (isNaN(delta[1])) {
      delta[1] = 0;
    }
    return delta;
  }
};

export default Mouse;
