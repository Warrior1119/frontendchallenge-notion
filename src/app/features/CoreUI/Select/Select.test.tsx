import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './Select';

describe('Select', () => {
  let options: Array<{text: string, value: string}>;

  beforeEach(() => {
    options= [
      { text: 'London', value: 'london' },
      { text: 'Washington', value: 'washington' },
      { text: 'Madrid', value: 'madrid' },
      { text: 'Paris', value: 'paris' },
      { text: 'Rome', value: 'rome' },
    ];
  });

  afterEach(cleanup);
  it('shows default label', () => {
    const handleOpen = jest.fn();
    const { getByText, getByRole } = render(<Select
      options={options}
      defaultLabel='Select Locations'
    />);

    const element = getByText('Select Locations');
    expect(element).toBeInTheDocument();
  });

  it('opens the panel when label is clicked', () => {
    const { getByText, container } = render(<Select
      options={options}
      defaultLabel='Select Locations'
    />);

    const element = getByText('Select Locations');
    userEvent.click(element);

    const panelElement = container.querySelector('ul');
    expect(panelElement).toBeInTheDocument();
  });

  it('shows the list of all options', () => {
    const { getByText, container } = render(<Select
      options={options}
      defaultLabel='Select Locations'
    />);

    const element = getByText('Select Locations');
    userEvent.click(element);

    const panelElement = container.querySelector('ul');
    expect(panelElement?.children).toHaveLength(6);
    
  });

  it('hides the panel when option is clicked', () => {
    const { getByText, container } = render(<Select
      options={options}
      defaultLabel='Select Locations'
    />);

    const element = getByText('Select Locations');
    userEvent.click(element);
    const panelElement = container.querySelector('ul');
    expect(panelElement).toBeInTheDocument();

    userEvent.click(element); 
    expect(panelElement).not.toBeInTheDocument();

  });

  it('handles the change event', () => {

    const handleChange = jest.fn();
    const { getByText, container } = render(<Select
      options={options}
      defaultLabel='Select Locations'
      onChange={handleChange}
    />);

    expect(handleChange).not.toHaveBeenCalled();

    const element = getByText('Select Locations');
    userEvent.click(element);
    
    const optionElement = getByText('Madrid');
    userEvent.click(optionElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('madrid');
  });

  it('render default selected label', () => {
    const { getByText, container } = render(<Select
      options={options}
      defaultLabel='Select Locations'
      selected='madrid'
    />);

    const element = getByText('Madrid');
    userEvent.click(element);
  });
});