/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
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

// storybook-action-logger doesn't support auto event expansion,
// but most consoles do
const storyAction = (name) => {
  const actionCallback = action(name);
  return (e) => {
    console.log(name, e);
    actionCallback(e);
  }
}

storiesOf('Events', module)
  .add('onResidue', () => (
    <MSAViewer sequences={sequences} >
      <SequenceViewer
        onResidueMouseEnter={storyAction('onResidueMouseEnter')}
        onResidueMouseLeave={storyAction('onResidueMouseLeave')}
        onResidueClick={storyAction('onResidueClick')}
        onResidueDoubleClick={storyAction('onResidueDoubleClick')}
      />
    </MSAViewer>
  ))
  .add('Extra information on click', () => {
    class ExtraInformation extends Component {
      state = {
      }
      onResidueClick = (e) => {
        this.setState({lastEvent: e});
      }
      render() {
        return (
          <div>
            <MSAViewer sequences={sequences} >
              <SequenceViewer
                onResidueClick={this.onResidueClick}
              />
            </MSAViewer>
            { this.state.lastEvent &&
              <div>
                Selection: {this.state.lastEvent.residue}
                (from {this.state.lastEvent.sequence.name})
              </div>
            }
          </div>
        );
      }
    };
    return (
      <ExtraInformation />
    );
  })
;
