/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import { storiesOf } from '@storybook/react';
import { MSAViewer } from '../lib';

import {
  createMSAStore,
  Labels,
  OverviewBar,
  PositionBar,
  SequenceOverview,
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

storiesOf('Layouting', module)
  .add('Inverse', function(){
    const overviewBarHeight = 50;
    const labelsStyle = {
      paddingTop: 20 + overviewBarHeight,
    }
    return (
      <MSAViewer sequences={sequences}>
        <SequenceOverview
        />
        <div style={{display: "flex"}} >
          <div>
            <OverviewBar
              height={overviewBarHeight}
            />
            <PositionBar/>
            <SequenceViewer/>
          </div>
          <Labels
            style={labelsStyle}
          />
        </div>
      </MSAViewer>
    )
  })
  .add('Inverse II', function(){
    return (
      <MSAViewer sequences={sequences}>
        <SequenceOverview/>
        <div style={{display: "flex"}} >
          <div>
            <SequenceViewer/>
            <br/>
            <OverviewBar/>
            <PositionBar/>
          </div>
          <Labels/>
        </div>
      </MSAViewer>
    )
  })
  .add('Full', function(){
    return (
      <MSAViewer sequences={sequences}>
        <div style={{display: "flex"}}>
          <Labels/>
          <div>
            <SequenceViewer/>
            <PositionBar/>
            <br/>
            <OverviewBar/>
            <br/>
            <PositionBar/>
            <OverviewBar
              method="information-content"
            />
          </div>
        </div>
        <br/>
        <SequenceOverview/>
      </MSAViewer>
    )
  })
  .add('Compact', function(){
    return (
      <MSAViewer sequences={sequences}>
        <PositionBar/>
        <SequenceViewer/>
      </MSAViewer>
    )
  })
  .add('Funky', function(){
    const options = {
      sequences,
    };
    const store = createMSAStore(options);
    const labelsStyle = {
      paddingTop: store.getState().viewpoint.tileSizes[1],
    }
    return (
      <MSAViewer store={store}>
        <SequenceOverview/>
        <div style={{display: "flex"}} >
          <Labels
            style={labelsStyle}
          />
          <div>
            <PositionBar/>
            <SequenceViewer/>
            <PositionBar/>
            <OverviewBar/>
            <br/>
            <PositionBar/>
          </div>
          <Labels
            style={labelsStyle}
          />
        </div>
        <br/>
        <SequenceOverview/>
      </MSAViewer>
    )
  })
 ;
