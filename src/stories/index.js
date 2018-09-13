import React from 'react';
import { storiesOf } from '@storybook/react';
import {MSAViewer, MSASequence} from '../..';
import {times} from 'lodash';
import { select, number } from '@storybook/addon-knobs';

storiesOf('Basic', module)
  .add('Standard rendering', function(){
    const options = {
      ui: {
        scheme: "clustal",
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
      sequences: [
        {
          name: "seq.1",
          sequence: "MEEPQSDPSIEP"
        },
        {
          name: "seq.2",
          sequence: "MEEPQSDLSREL"
        },
        {
          name: "seq.3",
          sequence: "MERPQSDLSIEL"
        },
      ],
    };
    return (
    <MSAViewer {...options} >
    </MSAViewer>
    )
  })
  .add('WebGL (WIP)', function(){
    const options = {
      ui: {
        scheme: "clustal",
        engine: "webgl",
      },
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
;
