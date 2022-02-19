import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Box, Button } from '@mui/material';
import clsx from 'clsx';

// Components
import { Icon } from '../Icon/Icon';

// Styles
import './IconTextButton.scss';

type IconTextButtonProps = {
  children: string;
  classes?: string;
  icon: [IconPrefix, IconName];
};

export const IconTextButton = (props: IconTextButtonProps) => {
  return (
    <Button
      color="inherit"
      disableFocusRipple
      sx={{
        '&:hover': {
          backgroundColor: 'inherit'
        },
        '& .icon-text-button-text': {
          borderColor: 'transparent',
          '&:hover': {
            borderColor: 'text.primary'
          }
        }
      }}
      className={clsx('icon-text-button', props.classes && props.classes)}
    >
      <Icon icon={props.icon} />
      <Box className="icon-text-button-text">{props.children}</Box>
    </Button>
  );
};
