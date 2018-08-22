import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import MSA from '../..';

const stories = storiesOf('Examples', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

//<Button onClick={action('clicked')}>
  //{text("label", "hello")}
//</Button>
stories
  .add('Initial ones', () => (
    <MSA>
    </MSA>
  ))

;
