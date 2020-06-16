import React, { FC, KeyboardEvent, forwardRef, Ref, useCallback, useState } from 'react';
import classNames from 'classnames';

import Label from '../Label/Label';
import CheckBoxIcon from '../Icons/CheckboxIcon';
import styles from './CheckBox.module.scss';

interface Props {
  /** 
   * Identifier for form submit
  */
  name?: string;

  /**
   * Label to be displayed alongside with checkbox
   */
  label?: string;

  /**
   * Default value of checkbox
   */
  defaultValue?: boolean;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (newChecked: boolean) => void;

  /**
   * React ref passthrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const CheckBox: FC<Props> = forwardRef((props, ref) => {
  const { label, defaultValue, disabled, onChange, ...otherProps } = props;

  const [isChecked, setChecked] = useState(!!defaultValue);
  const [hasFocus, setFocus] = useState(false);

  const toggle = useCallback(
    () => {
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange],
  );

  const focus = useCallback(
    () => {
      setFocus(true)
    },
    []
  );

  const unfocus = useCallback(
    () => {
      setFocus(false)
    },
    []
  )

  const onKeyPress = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.which === 32) {
      toggle();
    }
  }

  return (
    <Label 
      title={label || ''} 
      className={classNames(styles.checkbox, {
        [styles.disabled]: disabled,
      })}
      tabIndex={0}
      disabled={disabled}
      position='right'
      onFocus={focus}
      onBlur={unfocus}
      onMouseEnter={focus}
      onMouseLeave={unfocus}
      onKeyPress={onKeyPress}
    >

      <CheckBoxIcon
        isActive={isChecked}
        hasHover={hasFocus}
      />
      <input
        type='checkbox'
        className={styles.input}
        ref={ref}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        {...otherProps}
      />
    </Label>
  );
});

export default CheckBox;