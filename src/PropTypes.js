import PropTypes from 'prop-types';

export const SequencePropType = PropTypes.shape({
  name: PropTypes.string,
  sequence: PropTypes.string,
})

export const ViewpointPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
  tileSizes: PropTypes.arrayOf(PropTypes.number), // TODO: check element size or use an object
  fontSize: PropTypes.string,
});

export const UIPropType = PropTypes.shape({
    color: PropTypes.string,
    scheme: PropTypes.string,
    engine: PropTypes.string,
});


export const MSAPropTypes = {
  sequences: PropTypes.arrayOf(SequencePropType).isRequired,
  viewpoint: ViewpointPropType,
  ui: UIPropType,
};

export const msaDefaultProps = {
  viewpoint: {
    width: 500,
    height: 100,
    tileSizes: [20, 20],
    fontSize: "20px Arial",
    position: {
      xPos: 0,
      yPos: 0,
    },
    msecsPerFps: 1000  / 60,
  },
  ui: {
    color: "red",
    scheme: "clustal",
    engine: "canvas",
  }
};
