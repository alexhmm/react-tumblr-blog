import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { TextButton } from '../../ui/TextButton/TextButton';

// Styles
import './Title.scss';

export const Title = () => {
  const navigate = useNavigate();

  /**
   * Handler to navigate to home screen on title click.
   */
  const onTitleClick = useCallback(() => {
    navigate('/');
    // eslint-disable-next-line
  }, []);

  return (
    <TextButton classes="title" size="large" onClick={onTitleClick}>
      {process.env.REACT_APP_TITLE ?? ''}
    </TextButton>
  );
};
