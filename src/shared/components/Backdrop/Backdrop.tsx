import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

// Stores
import {
  SharedState,
  useSharedStore,
} from '../../stores/use-shared-store.hook';

// Styles
import styles from './Backdrop.module.scss';

export const Backdrop = () => {
  // Refs
  const backdropRef = useRef<HTMLElement | null>(null);

  // Shared store state
  const [touch] = useSharedStore((state: SharedState) => [state.touchId]);

  useEffect(() => {
    if (touch) {
      if (backdropRef.current) {
        backdropRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      setTimeout(() => {
        if (backdropRef.current) {
          backdropRef.current.style.opacity = '1';
        }
      }, 25);
    } else {
      if (backdropRef.current) {
        backdropRef.current.style.opacity = '0';
      }
      setTimeout(() => {
        if (backdropRef.current) {
          backdropRef.current.style.display = 'none';
          document.body.style.overflow = 'initial';
        }
      }, 250);
    }
  }, [touch]);

  return <Box className={styles['backdrop']} ref={backdropRef}></Box>;
};
