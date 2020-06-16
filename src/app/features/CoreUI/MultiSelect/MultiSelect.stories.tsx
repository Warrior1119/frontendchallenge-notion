import React from 'react';
import { action } from '@storybook/addon-actions';

import MultiSelect from './MultiSelect';
import '../../App/Root/Root.scss';

export default {
  component: MultiSelect,
  title: 'MultiSelect',
};

export const normal = () => (
  <MultiSelect
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={[]}
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);

export const fillWidth = () => (
  <MultiSelect
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={[]}
    fillWidth
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);

export const defaultSelected = () => (
  <MultiSelect
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={['Madrid', 'Paris']}
    fillWidth
    defaultLabel='Select Locations'
    onChange={action('change')}
  />
);

export const disabled = () => (
  <MultiSelect
    options={[
      { text: 'London', value: 'London' },
      { text: 'Washington', value: 'Washington' },
      { text: 'Madrid', value: 'Madrid' },
      { text: 'Paris', value: 'Paris' },
      { text: 'Rome', value: 'Rome' },
    ]}
    selected={[]}
    disabled
    defaultLabel='Select Locations'
  />
);
