import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

// Hooks
import { useBreakpoints } from '../../hooks/use-breakpoints.hook';

// Styles
import './TextButton.scss';

type TextButtonProps = {
  children: string;
  classes?: string;
  size?: 'xtrasmall' | 'large' | 'xtralarge';
  onClick?: () => void;
};

export const TextButton = (props: TextButtonProps) => {
  const { lgDown, lgUp } = useBreakpoints();

  // Component state
  const [textSize, setTextSize] = useState<
    { fontSize: string; lineHeight: number | string } | undefined
  >(undefined);

  useEffect(() => {
    if (props.size === 'xtrasmall') {
      setTextSize({
        fontSize: '0.75rem',
        lineHeight: '1rem'
      });
    }
    if (props.size === 'large' && lgDown) {
      setTextSize({
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
      });
    }
    if (props.size === 'large' && lgUp) {
      setTextSize({
        fontSize: '1.25rem',
        lineHeight: '1.75rem'
      });
    }
    if (props.size === 'xtralarge' && lgDown) {
      setTextSize({
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
      });
    }
    if (props.size === 'xtralarge' && lgUp) {
      setTextSize({
        fontSize: '1.5rem',
        lineHeight: '2rem'
      });
    }
  }, [props, lgDown, lgUp]);

  return (
    <Button
      color="inherit"
      disableFocusRipple
      sx={{
        ...textSize,
        borderColor: 'transparent',
        borderStyle: 'solid',
        '&:hover': {
          backgroundColor: 'inherit',
          borderColor: 'text.primary'
        }
      }}
      onClick={props.onClick && props.onClick}
      className={clsx('text-button', props.classes && props.classes)}
    >
      {props.children}
    </Button>
  );
};
