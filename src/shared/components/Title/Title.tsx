import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import clsx from 'clsx';

// Components
import { IconTextButton } from '../../ui/IconTextButton/IconTextButton';

// Hooks
import { useBreakpoints } from '../../hooks/use-breakpoints.hook';

// Stores
import {
  SharedState,
  useSharedStore,
} from '../../stores/use-shared-store.hook';

// Styles
import styles from './Title.module.scss';

export const Title = () => {
  const { lgDown } = useBreakpoints();
  const navigate = useNavigate();

  // Shared store state
  const [pageTitle, title] = useSharedStore((state: SharedState) => [
    state.pageTitle,
    state.title,
  ]);

  // Set document title
  useEffect(() => {
    if (title) {
      document.title = title
        ? pageTitle?.document
          ? `${title} •  ${pageTitle.document}`
          : title
        : '';
    }

    // eslint-disable-next-line
  }, [title, pageTitle]);

  /**
   * Handler to navigate back.
   */
  const onNavigateBack = useCallback(() => {
    navigate(-1);
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      {pageTitle ? (
        <IconTextButton
          classes={styles['title']}
          icon={['fas', 'chevron-left']}
          size="large"
          onClick={onNavigateBack}
        >
          <div className={styles['title-text']}>{pageTitle.text}</div>
        </IconTextButton>
      ) : (
        <Box
          className={clsx(styles['title'], styles['title-home'])}
          sx={{
            borderColor: 'transparent',
            letterSpacing: pageTitle ? 0 : lgDown ? '0.1em' : '0.2em',
          }}
        >
          {process.env.REACT_APP_TITLE ?? ''}
        </Box>
      )}
    </>
  );
};
