/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

/**
 * This wrapper listens to prop changes and forwards these to their
 * appropriate redux store actions.
 */

import React, { Component } from 'react';

import createMSAStore from './createMSAStore';
import * as actions from './actions';

import {
  isEqual,
  omit,
  pick,
} from 'lodash-es';

/// Maps property changes to redux actions
const reduxActions = {
  "position": "updatePosition",
  "sequences": "updateSequences",
  "ui": "updateUI",
  "viewpoint": "updateViewpoint",
}

const attributesToStore = Object.keys(reduxActions);


export const propsToRedux = (WrappedComponent) => {
  return class PropsToReduxComponent extends Component {

    constructor(props) {
      super(props);
      const storeProps = pick(props, attributesToStore) || {};
      this.msaStore = props.msaStore;
      if (storeProps.sequences !== undefined) {
        this.msaStore = createMSAStore(storeProps);
        console.log("STORE", this.msaStore.getState());
      } else {
        console.warn("Check your MSA properties", storeProps);
      }
    }

    // Notify the internal Redux store about property updates
    componentDidUpdate(oldProps) {
      const newProps = this.props;
      for (const prop in pick(newProps, attributesToStore)) {
        if (!isEqual(oldProps[prop], newProps[prop])) {
          if (prop in reduxActions) {
            const action = actions[reduxActions[prop]](newProps[prop]);
            this.msaStore.dispatch(action);
          } else {
            console.error(prop, " is unknown.");
          }
        }
      }
    }

    render() {
      const {msaStore, ...props} = omit(this.props, attributesToStore);
      if (this.msaStore === undefined) {
        return (<div> error... </div>)
      } else {
        console.log("PROPS", this.msaStore.getState());
        return (
          <WrappedComponent msaStore={msaStore || this.msaStore} {...props} />
        );
      }
    }
  }
}

export default propsToRedux;
