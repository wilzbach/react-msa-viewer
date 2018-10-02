/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React, { Component } from 'react';
import MSAViewer from './components/MSAViewer';

class App extends Component {
  render() {
    const options = {
      sequences: [
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
        {
          name: "seq.4",
          sequence: "MEEPQSDLSIEL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
        },
        {
          name: "seq.5",
          sequence: "MEEPQSD--IEL-PLSEETFSDLWWPLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
        },
        {
          name: "seq.6",
          sequence: "MEEPQEDLSSSL-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE-LFLSENVAGWLEDP"
        },
        {
          name: "seq.7",
          sequence: "MEEPQ---SISE-PLSQETFSDLWKLLPPNNVLSTLPS-SDSIEE---LSENVAGWLEDP"
        },
      ],
      ui: {
        scheme: "clustal",
      }
    };
    return (
      <div>
        <MSAViewer {...options} />
      </div>
    );
  }
}
export default App;
