import { Box } from '@mui/material';
import clsx from 'clsx';

// Styles
import styles from './Loader.module.scss';

type LoaderProps = {
  classes?: string;
  size?: number;
};

export const Loader = (props: LoaderProps) => {
  return (
    <Box className={clsx(styles['loader'], props.classes && props.classes)}>
      <Box
        className={styles['bounce1']}
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem',
        }}
      ></Box>
      <Box
        className={styles['bounce2']}
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem',
        }}
      ></Box>
      <Box
        className={styles['bounce3']}
        sx={{
          backgroundColor: 'text.primary',
          height: props.size ?? '0.5rem',
          width: props.size ?? '0.5rem',
        }}
      ></Box>
    </Box>
  );
};
