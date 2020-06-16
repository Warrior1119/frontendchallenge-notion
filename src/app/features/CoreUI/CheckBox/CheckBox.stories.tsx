import React from 'react';
import { action } from '@storybook/addon-actions';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import CheckBox from './CheckBox';

export default {
  component: CheckBox,
  title: 'CheckBox',
};

export const normal = () => (
  <TwoColumnGrid>
    <CheckBox label='CheckBox 1' onChange={action('changed')} />
    <CheckBox label='CheckBox 2' onChange={action('changed')} />
    <CheckBox label='CheckBox 3' onChange={action('changed')} />
    <CheckBox label='CheckBox 4' onChange={action('changed')} />
    <CheckBox label='CheckBox 5' onChange={action('changed')} />
  </TwoColumnGrid>
);

export const checked = () => (
  <CheckBox label='Default Checked' defaultValue onChange={action('changed')} />
);

export const disabledNormal = () => <CheckBox label='Disabled' disabled />;

export const disabledChecked = () => (
  <CheckBox label='Disabled and Checked' defaultValue disabled />
);
