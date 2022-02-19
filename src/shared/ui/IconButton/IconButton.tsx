import { forwardRef, ReactNode } from 'react';
import { Button } from '@mui/material';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';

// Components
import { Icon } from '../Icon/Icon';

// Styles
import './IconButton.scss';

type IconButtonProps = {
  children?: ReactNode;
  classes?: string;
  disabled?: boolean;
  icon: [IconPrefix, IconName];
  iconSize?: 'small' | 'medium' | 'large';
  onClick?: (event?: any) => void;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    // Warning: React does not recognize the xxx prop on a DOM element.
    // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase xxx instead.
    // If you accidentally passed it from a parent component, remove it from the DOM element.
    // https://reactjs.org/warnings/unknown-prop.html
    const { classes, disabled, icon, iconSize, ...rest } = props;

    return (
      <Button
        {...rest}
        color="inherit"
        disabled={disabled && disabled}
        ref={ref}
        onClick={props.onClick && props.onClick}
        className={clsx('icon-button', classes && classes)}
      >
        <Icon
          classes={clsx('icon-button-icon', disabled && 'icon-button-disabled')}
          icon={icon}
          size={iconSize ?? 'small'}
          sx={{ color: 'text.primary' }}
        />
        {props.children && props.children}
      </Button>
    );
  }
);
