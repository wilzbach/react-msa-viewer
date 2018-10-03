/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import { storiesOf } from '@storybook/react';
import { MSAViewer } from '../..';
import { select } from '@storybook/addon-knobs';

storiesOf('Customization', module)
  .add('Colorschemes', function(){
    // see https://github.com/wilzbach/msa-colorschemes for now
    const colorschemes = [
      "buried_index", "clustal", "clustal2",
      "cinema", "helix_propensity", "hydro", "lesk", "mae", "nucleotide",
      "purine_pyrimidine", "strand_propensity", "taylor", "turn_propensity",
      "zappo",
    ];
    const options = {
      ui: {
        scheme: select("Colorscheme", colorschemes, "zappo"),
      },
      viewpoint: {
        height: 60,
      },
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
      ],
    };
    return (
    <MSAViewer {...options} >
    </MSAViewer>
    )
  })
 ;
