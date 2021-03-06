/**
* Copyright 2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import { storiesOf } from '@storybook/react';
import {MSAViewer} from '../lib';
import {times} from 'lodash-es';

storiesOf('WIP', module)
 .add('WebGL', function(){
    const options = {
      engine: "webgl",
      sequences: [],
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
