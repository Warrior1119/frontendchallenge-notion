import React, {
  FC,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  Ref,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";
import ArrowIcon from "../Icons/ArrowIcon";

import styles from "./Dropdown.module.scss";

interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Register callback for change event
   */
  onChange?: () => void;

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
   * Current value of input
   */
  value?: string;

  /**
   * Expandes status of panel
   */
  expanded?: boolean;

  /**
   * Renderer callback to render content of the panel
   */
  panelRenderer: () => JSX.Element;

  /**
   * Register callback to open panel
   */
  openPanel: () => void;

  /**
   * Register callback to close panel
   */
  closePanel: () => void;

  /**
   * Label to show 
   */
  label?: string;

  /**
   * Open
   */
  isOpen?: boolean;
  
  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Dropdown: FC<Props> = forwardRef((props, ref) => {
  const {
    name,
    fillWidth,
    expanded,
    openPanel,
    closePanel,
    className,
    label,
    value,
    panelRenderer,
    disabled,
  } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("touchstart", onClickDocument);
    window.addEventListener("mousedown", onClickDocument);

    return function cleanup() {
      window.removeEventListener("touchstart", onClickDocument);
      window.removeEventListener("mousedown", onClickDocument);
    };
  });

  const toggleExpanded = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    if (expanded) {
      closePanel();
    } else {
      openPanel();
    }
  };

  const onClickDocument = (event: Event) => {
    if (wrapperRef && !(wrapperRef.current as any).contains(event.target) && expanded) {
      closePanel();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.which) {
      case 27: // Escape
        closePanel();
        break;
      case 38: // Up Arrow
        closePanel();
          break;
      case 13: // Enter Key
      case 32: // Space
      case 40: // Down Arrow
        openPanel();
        break;
      default:
          return;
    }

    event.preventDefault();
  };

  const renderPanel = () => (
    <div className={classNames(styles.panel)}>{panelRenderer()}</div>
  );

  return (
    <div
      className={classNames(styles.wrapper, className, { [styles.fillWidth]: fillWidth})}
      ref={wrapperRef}
    >
      <div
        className={classNames(styles.input, {
          [styles.expanded]: expanded,
          [styles.disabled]: disabled,
        })}
        onClick={toggleExpanded}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <span className={classNames(styles.label)}>{label}</span>
        <span className={classNames(styles.arrow, { [styles.expanded]: expanded })}>
          <ArrowIcon />
        </span>
        <input name={name}  type='hidden' value={value}  readOnly ref={ref} />
      </div>

      {expanded && renderPanel()}
    </div>
  );
});

export default Dropdown;
