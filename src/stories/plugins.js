/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React, {Component} from 'react';
import { storiesOf } from '@storybook/react';
import {
  msaConnect,
  MSAViewer,
  SequenceViewer,
} from '../lib';

const sequences = [
  {
    name: "seq.1",
    sequence: "MEEPQSDPSIEP-PLSQETFSDLWKLLPENNVLSPLPS-QA-VDDLMLSPDDLAQWLTED"
  },
  {
    name: "seq.2",
    sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
  },
  {
    name: "seq.3",
    sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
  },
];

storiesOf('Plugins', module)
  .add('My first plugin', function(){

    class MyFirstMSAPluginComponent extends Component {
      render() {
        return (
          <div>
            x: {this.props.xPos},
            y: {this.props.yPos}
          </div>
        );
      }
    }

    const mapStateToProps = state => {
      return {
        xPos: state.position.xPos,
        yPos: state.position.yPos,
      }
    }

    const MyFirstMSAPlugin = msaConnect(
      mapStateToProps,
    )(MyFirstMSAPluginComponent);

    return (
      <MSAViewer sequences={sequences} height={60}>
        <SequenceViewer />
        <MyFirstMSAPlugin />
      </MSAViewer>
    );
  })
 ;
