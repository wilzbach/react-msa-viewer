/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import { storiesOf } from '@storybook/react';
import { MSAViewer } from '../src/lib';
import { times } from 'lodash';
import { select, number } from '@storybook/addon-knobs';

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
];

storiesOf('Basic', module)
  .add('Standard rendering', function(){
    const options = {
      sequences,
    };
    return (
    <MSAViewer {...options} >
    </MSAViewer>
    )
  })
  .add('Big viewpoint', function(){
    const options = {
      ui: {
        scheme: "clustal",
      },
      sequences: [],
      viewpoint: {
        height: number("height", 500),
        width: number("width", 500),
        tileSizes: [number("xTileSize", 20), number("yTileSize", 20)],
      }
    };
    times(100, () => {
      options.sequences.push({
          name: "seq",
          sequence: "MEEPQSDPSIEP-PLSQETFSDLWKLLPENNVLSPLPS-QA-VDDLMLSPDDLAQWLTED"
      });
    });
    return (
    <MSAViewer {...options} >
    </MSAViewer>
    )
  })
;
