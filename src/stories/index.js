import React from 'react';
import { storiesOf } from '@storybook/react';
import {MSAViewer, MSASequence} from '../..';

storiesOf('Examples', module)
  .add('Basic rendering', function(){
    const options = {
      scheme: "clustal",
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
      ],
    };
    return (
    <MSAViewer {...options} >
    </MSAViewer>
    )
  })
;
