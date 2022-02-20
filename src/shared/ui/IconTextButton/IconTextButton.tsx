import { useEffect, useState } from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Box, Button } from '@mui/material';
import clsx from 'clsx';

// Components
import { Icon } from '../Icon/Icon';

// Hooks
import { useBreakpoints } from '../../hooks/use-breakpoints.hook';

// Styles
import './IconTextButton.scss';

type IconTextButtonProps = {
  children: string;
  classes?: string;
  icon: [IconPrefix, IconName];
  size?: 'large';
  onClick?: () => void;
};

export const IconTextButton = (props: IconTextButtonProps) => {
  const { lgDown, lgUp } = useBreakpoints();

  // Component state
  const [textSize, setTextSize] = useState<
    { fontSize: string; lineHeight: number | string } | undefined
  >(undefined);

  // Set text size by prop
  useEffect(() => {
    if (props.size === 'large' && lgDown) {
      setTextSize({
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
      });
    } else if (props.size === 'large' && lgUp) {
      setTextSize({
        fontSize: '1.25rem',
        lineHeight: '1.75rem'
      });
    } else {
      setTextSize({
        fontSize: '1rem',
        lineHeight: '1.5rem'
      });
    }
  }, [props, lgDown, lgUp]);

  return (
    <Button
      color="inherit"
      disableFocusRipple
      sx={{
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '&:hover .icon-text-button-text': {
          borderColor: 'text.primary'
        },
        '& .icon-text-button-text': {
          borderColor: 'transparent'
        }
      }}
      onClick={props.onClick && props.onClick}
      className={clsx('icon-text-button', props.classes && props.classes)}
    >
      <Icon icon={props.icon} />
      <Box sx={{ ...textSize }} className="icon-text-button-text">
        {props.children}
      </Box>
    </Button>
  );
};
