import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import { IconTextButton } from '../../ui/IconTextButton/IconTextButton';

// Stores
import {
  SharedState,
  useSharedStore
} from '../../stores/use-shared-store.hook';

// Styles
import './Title.scss';

export const Title = () => {
  const navigate = useNavigate();

  // Shared store state
  const [subtitle, title] = useSharedStore((state: SharedState) => [
    state.subtitle,
    state.title
  ]);

  // Set document title
  useEffect(() => {
    if (title) {
      document.title = title
        ? subtitle?.document
          ? `${title} •  ${subtitle.document}`
          : title
        : '';
    }

    // eslint-disable-next-line
  }, [title, subtitle]);

  /**
   * Handler to navigate back.
   */
  const onNavigateBack = useCallback(() => {
    navigate(-1);
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      {subtitle ? (
        <IconTextButton
          classes="title"
          icon={['fas', 'chevron-left']}
          size="large"
          onClick={onNavigateBack}
        >
          {subtitle.text}
        </IconTextButton>
      ) : (
        <Box sx={{ borderColor: 'transparent' }} className="title title-home">
          {process.env.REACT_APP_TITLE ?? ''}
        </Box>
      )}
    </>
  );
};
