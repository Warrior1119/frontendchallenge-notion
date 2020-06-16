import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
  let renderPanel: () => JSX.Element;
  beforeEach(() => {
    renderPanel = () => (
      <div>
        Dropdown Panel
      </div>
    );
  })
  afterEach(cleanup);

  it('shows default label', () => {
    const { getByText } = render(<Dropdown
      label='Click to open the dropdown'
      expanded={false}
      openPanel={() => {}}
      closePanel={() => {}}
      panelRenderer={renderPanel}
    />);

    const element = getByText('Click to open the dropdown');
    expect(element).toBeInTheDocument();
  });

  it('shows panel when expanded', () => {
    const { getByText } = render(<Dropdown
      label='Click to open the dropdown'
      expanded={true}
      openPanel={() => {}}
      closePanel={() => {}}
      panelRenderer={renderPanel}
    />);

    const element = getByText('Dropdown Panel');
    expect(element).toBeInTheDocument();

  });

  it('hides panel when expanded', () => {
    const { container } = render(<Dropdown
      label='Click to open the dropdown'
      expanded={false}
      openPanel={() => {}}
      closePanel={() => {}}
      panelRenderer={renderPanel}
    />);

    expect(container.children).toHaveLength(1);
  });

  it('handles opening panel when the element is clicked', () => {
    const handleOpen = jest.fn();
    const { getByText } = render(<Dropdown
      label='Click to open the dropdown'
      expanded={false}
      openPanel={handleOpen}
      closePanel={() => {}}
      panelRenderer={renderPanel}
    />);

    const element = getByText('Click to open the dropdown');
    expect(handleOpen).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('toggles panel when the element is clicked', () => {
    const handleClose = jest.fn();
    const { getByText } = render(<Dropdown
      label='Click to open the dropdown'
      expanded={true}
      openPanel={()=> {}}
      closePanel={handleClose}
      panelRenderer={renderPanel}
    />);

    const element = getByText('Click to open the dropdown');
    expect(handleClose).not.toHaveBeenCalled();

    userEvent.click(element);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

});
