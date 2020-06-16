import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckBox from './CheckBox';

describe('CheckBox', () => {
  afterEach(cleanup);

  it('renders in the document', () => {
    const { getByRole } = render(<CheckBox label='Forgot password' />);
    const element = getByRole('checkbox');
    expect(element).toBeInTheDocument();
  });

  it('displays label', () => {
    const handleChange = jest.fn();
    const { getByText } = render(<CheckBox label='Forgot password' onChange={handleChange} />);
    const element = getByText('Forgot password');
    expect(element).toBeInTheDocument();
  });

  it('handles onChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<CheckBox onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles toggling checked state', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<CheckBox onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);

    handleChange.mockClear();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('handles default checked state', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<CheckBox defaultValue onChange={handleChange} />);
    const element = getByRole('checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange in readonly mode', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<CheckBox onChange={handleChange} disabled />);
    const element = getByRole('checkbox');

    userEvent.click(element);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
