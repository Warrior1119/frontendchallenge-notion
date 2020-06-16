import React, { FC, forwardRef, Ref, useState, useEffect } from 'react';
import classNames from 'classnames';
import Dropdown from '../Dropdown/Dropdown';
import CheckBox from '../CheckBox/CheckBox';
import styles from './MultiSelect.module.scss';

interface Props {

  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Select options to show in the dropdown
   */
  options: Array<{text: string, value: any}>;

  /**
   * Selected Options
   */
  selected?: Array<any>

  /**
   * Register callback for change event
   */
  onChange?: (selected: Array<any>) => void;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Stretch to max width. Default: false
   */
  fillWidth?: boolean;

  /**
   * input className
   */
  className?: string;

  /**
   * Default Label
   */
  defaultLabel?: string;

  /**
   * Open
   */
  isOpen?: boolean;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const MultiSelect: FC<Props> = forwardRef((props, ref) => {
  const { name, fillWidth, disabled, className, options, selected, defaultLabel, onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState(selected || []);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [label, setLabel] = useState('');


  const updateSelected = (currentSelected: any[]) => {
    if (currentSelected.length === 0) {
      setLabel(defaultLabel || 'Select');
      setValue('');
      return;
    }
    let selectedLabels = [];

    for (let i = 0; i < options.length; i++) {
      if (currentSelected.includes(options[i].value)) {
        selectedLabels.push(options[i].text);
      }
    }
    setLabel(selectedLabels.join(', '));
    setValue(currentSelected.join(','));
  }

  const onChangeCheck = (value: any, checked: boolean) => {
    let newSelected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        if (checked) {
          newSelected.push(options[i].value);
        }
      } else {
        if (selectedOptions.includes(options[i].value)) {
          newSelected.push(options[i].value);
        }
      }
    }

    setSelectedOptions(newSelected);
    updateSelected(newSelected);

    if (onChange) {
      onChange(newSelected);
    }
  }

  const openPanel = () => {
    setExpanded(true);
  }

  const closePanel = () => {
    setExpanded(false);
  }

  useEffect(() => {
    updateSelected(selectedOptions);
  }, []);

  const renderPanel = () => (
    <ul className={classNames(styles.menu)}>
      {options.map(option => (
        <li className={classNames(styles.menuItem)} key={option.value}>
          <CheckBox 
            label={option.text}
            defaultValue={selectedOptions.includes(option.value)} 
            onChange={(checked) => onChangeCheck(option.value, checked)}
          />
        </li>    
      ))}
    </ul>
  );
  
  return (
    <Dropdown 
      name={name}
      label={label} 
      className={className}
      expanded={expanded}
      openPanel={openPanel}
      closePanel={closePanel}
      disabled={disabled}
      fillWidth={fillWidth}
      panelRenderer={renderPanel}
      value={value}
      ref={ref}
    />
  );
});

export default MultiSelect;
