import React from 'react';
import { action } from '@storybook/addon-actions';

import Select from './Select';
import '../../App/Root/Root.scss';

export default {
  component: Select,
  title: 'Select',
};

export const normal = () => (
  <Select
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={'Rome'}
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);

export const fullWidth = () => (
  <Select
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    fillWidth
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);

export const defaultSelected = () => (
  <Select
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    defaultLabel='Select Locations'
    selected={'London'}
    onChange={action('change')}
  />
);

export const disabled = () => (
  <Select
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={'Rome'}
    disabled
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);
