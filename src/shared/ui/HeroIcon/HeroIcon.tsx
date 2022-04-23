import { Box } from '@mui/material';
import { ReactNode } from 'react';

type HeroIconProps = {
  children: ReactNode;
  classes?: string;
  color?: string;
  size?: number;
};

export const HeroIcon = (props: HeroIconProps) => {
  return (
    <Box
      className={props.classes && props.classes}
      sx={{
        '& svg': {
          color: props.color ?? 'text.primary',
          width: props.size ?? 20,
        },
      }}
    >
      {props.children}
    </Box>
  );
};
