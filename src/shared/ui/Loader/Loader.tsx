import { Box } from '@mui/material';
import clsx from 'clsx';

// Styles
import './Loader.scss';

type LoaderProps = {
  classes?: string;
  size?: number;
};

export const Loader = (props: LoaderProps) => {
  return (
    <Box className={clsx('loader', props.classes && props.classes)}>
      <Box
        className="bounce1"
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem'
        }}
      ></Box>
      <Box
        className="bounce2"
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem'
        }}
      ></Box>
      <Box
        className="bounce3"
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem'
        }}
      ></Box>
    </Box>
  );
};
