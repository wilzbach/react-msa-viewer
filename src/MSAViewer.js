import React, { Component } from 'react';
import PropTypes from 'prop-types';

const schemes = new (require('msa-colorschemes'))();

class MSAViewer extends Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.scheme = schemes.getScheme(this.props.scheme);
    this.drawSequences();
  }

  drawSequences() {
    const xSize = 20;
    const ySize = 20;
    let yPos = 0, xPos = 0;
    for (const seq of this.props.sequences) {
      for (const el of seq.sequence) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = this.scheme.getColor(el);
        this.ctx.fillRect(xPos, yPos, xSize, ySize);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(el, xPos + 2, yPos + 17);
        xPos += xSize;
      }
      xPos = 0;
      yPos += ySize;
    }
  }

  componentDidUpdate() {

  }

  shouldComponentUpdate(newProps) {
    return this.props.target !== newProps.target;
  }

  render() {
    return (
      <canvas ref={this.canvas} with={500} height={500}>
      </canvas>
    );
  }
}

const SequencePropType = PropTypes.shape({
  name: PropTypes.string,
  sequence: PropTypes.string,
})

MSAViewer.propTypes = {
  color: PropTypes.string,
  scheme: PropTypes.string,
  sequences: PropTypes.arrayOf(SequencePropType).isRequired,
};

MSAViewer.defaultProps = {
  color: "red",
  scheme: "clustal",
}

export {MSAViewer};
export default MSAViewer;
