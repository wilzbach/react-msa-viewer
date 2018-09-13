import React, { Component } from 'react';

import createMSAStore from './createMSAStore';

export const propsToRedux = (WrappedComponent) => {
  return class PropsToReduxComponent extends Component {

    constructor(props) {
      super(props);
      this.store = props.store || createMSAStore(props);
    }

    // TODO: this method will be deprecated with React 17
    componentWillReceiveProps(nextProps) {
      // TODO: figure out how to update the store
      // TODO: store might change
    }

    render() {
      return (
        <WrappedComponent store={this.store} />
      );
    }
  }
}

export default propsToRedux;
