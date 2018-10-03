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

import {
  createMSAStore,
  Labels,
  OverviewBar,
  PositionBar,
  SequenceOverview,
  SequenceViewer,
} from '../..';

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
    const options = {
      sequences,
    };
    const store = createMSAStore(options);
    const overviewBarHeight = 50;
    const labelsStyle = {
      paddingTop: store.getState().viewpoint.tileSizes[1] + overviewBarHeight,
    }
    return (
      <div>
        <SequenceOverview
          store={store}
        />
        <div style={{display: "flex"}} >
          <div>
            <OverviewBar
              store={store}
              height={overviewBarHeight}
            />
            <PositionBar
              store={store}
            />
            <SequenceViewer
              store={store}
            />
          </div>
          <Labels
            store={store}
            style={labelsStyle}
          />
        </div>
      </div>
    )
  })
  .add('Inverse II', function(){
    const options = {
      sequences,
    };
    const store = createMSAStore(options);
    return (
      <div>
        <SequenceOverview
          store={store}
        />
        <div style={{display: "flex"}} >
          <div>
            <SequenceViewer
              store={store}
            />
            <br />
            <OverviewBar
              store={store}
            />
            <PositionBar
              store={store}
            />
          </div>
          <Labels
            store={store}
          />
        </div>
      </div>
    )
  })
  .add('Full', function(){
    const options = {
      sequences,
    };
    const store = createMSAStore(options);
    return (
      <div>
        <div style={{display: "flex"}} >
          <Labels
            store={store}
          />
          <div>
            <SequenceViewer
              store={store}
            />
            <PositionBar
              store={store}
            />
            <br />
            <OverviewBar
              store={store}
            />
            <br />
            <PositionBar
              store={store}
            />
            <OverviewBar
              store={store}
              method="information-content"
            />
          </div>
        </div>
        <br />
        <SequenceOverview
          store={store}
        />
      </div>
    )
  })
  .add('Compact', function(){
    const options = {
      sequences,
    };
    const store = createMSAStore(options);
    return (
      <span>
        <PositionBar
          store={store}
        />
        <SequenceViewer
          store={store}
        />
      </span>
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
      <div>
        <SequenceOverview
          store={store}
        />
        <div style={{display: "flex"}} >
          <Labels
            store={store}
            style={labelsStyle}
          />
          <div>
            <PositionBar
              store={store}
            />
            <SequenceViewer
              store={store}
            />
            <PositionBar
              store={store}
            />
            <OverviewBar
              store={store}
            />
            <br />
            <PositionBar
              store={store}
            />
          </div>
          <Labels
            store={store}
            style={labelsStyle}
          />
        </div>
        <br />
        <SequenceOverview
          store={store}
        />
      </div>
    )
  })
 ;
