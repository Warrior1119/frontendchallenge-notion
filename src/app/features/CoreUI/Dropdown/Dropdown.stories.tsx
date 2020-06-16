import React, { FC, useState } from 'react';
import { action } from '@storybook/addon-actions';

import Dropdown from './Dropdown';
import Label from '../Label/Label';
import '../../App/Root/Root.scss';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

const DropdownTest: FC<{}> = () => {
  const [expanded, setExpanded] = useState(false);
  const renderPanel = () => (
    <div>
      <Label title='Hey sample dropdown item' />
      <Label title='Hey sample dropdown item' />
      <Label title='Hey sample dropdown item' />
      <Label title='Hey sample dropdown item' />
      <Label title='Hey sample dropdown item' />
      <Label title='Hey sample dropdown item' />
    </div>
  );
  
  return (
    <Dropdown
      label='We Dropdown'
      expanded={expanded}
      openPanel={() => {
        setExpanded(true);
        action('openPanel')();
      }}
      closePanel={() => {
        setExpanded(false);
        action('closePanel')();
      }}
      panelRenderer={renderPanel}
    />
  );
};

export const normal = () => <DropdownTest />;
