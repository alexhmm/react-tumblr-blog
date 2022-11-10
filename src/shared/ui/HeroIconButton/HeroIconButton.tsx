import { forwardRef, ReactNode } from 'react';
import { Button } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './HeroIconButton.module.scss';

type HeroIconButtonProps = {
  arlabel: string;
  children?: ReactNode;
  classes?: string;
  disabled?: boolean;
  iconSize?: number;
  padding?: string;
  onClick?: (event?: any) => void;
};

export const HeroIconButton = forwardRef<
  HTMLButtonElement,
  HeroIconButtonProps
>((props, ref) => {
  // Warning: React does not recognize the xxx prop on a DOM element.
  // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase xxx instead.
  // If you accidentally passed it from a parent component, remove it from the DOM element.
  // https://reactjs.org/warnings/unknown-prop.html
  const { classes, disabled, iconSize, ...rest } = props;

  return (
    <Button
      {...rest}
      aria-label={props.arlabel}
      className={clsx(styles['icon-button'], classes && classes)}
      color="inherit"
      disabled={disabled && disabled}
      ref={ref}
      onClick={props.onClick && props.onClick}
      sx={{
        padding: props.padding ?? '0.5rem',
        '& svg': {
          width: props.iconSize ?? 20,
        },
      }}
    >
      {props.children && props.children}
    </Button>
  );
});
