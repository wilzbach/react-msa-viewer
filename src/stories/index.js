import React from 'react';
import { storiesOf } from '@storybook/react';
import MSA from '../..';

const stories = storiesOf('Examples', module)
  .add('Basic rendering', () => (
    <MSA>
    </MSA>
  ))
;
