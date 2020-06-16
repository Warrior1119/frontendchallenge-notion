import React, { FC, forwardRef, Ref, useState, useEffect } from 'react';
import classNames from 'classnames';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Select.module.scss';

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
  selected?: any

  /**
   * Register callback for change event
   */
  onChange?: (selected: any) => void;

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
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Select: FC<Props> = forwardRef((props, ref) => {
  const { name, fillWidth, disabled, className, options, selected, defaultLabel, onChange } = props;
  const [selectedValue, setSelectedValue] = useState(selected || null);
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const updateSelected = (currentSelected: any) => {
    if (currentSelected === null) {
      setLabel(defaultLabel || 'Select');
      setValue('');
      return;
    }
    
    for (let i = 0; i < options.length; i++) {
      if (currentSelected.includes(options[i].value)) {
        setLabel(options[i].text);
        setValue(options[i].value);
        return;
      }
    }
  }

  const onClickOption = (value: any) => {
    setSelectedValue(value);
    updateSelected(value);
    setExpanded(false);
    if (onChange) {
      onChange(value);
    }
  }

  const openPanel = () => {
    setExpanded(true);
  }

  const closePanel = () => {
    setExpanded(false);
  }

  useEffect(() => {
    updateSelected(selectedValue);
  }, []);
  
  const renderPanel = () => (
    <ul className={classNames(styles.menu)}>
      {defaultLabel && (
        <li 
          className={classNames(styles.menuItem)}
          onClick={() => onClickOption(null)}
        >{defaultLabel}</li>
      )}        
      {options.map(option => (
        <li className={classNames(styles.menuItem)} onClick={() => onClickOption(option.value)} key={option.value} >
          {option.text}
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

export default Select;
