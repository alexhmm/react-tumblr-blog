import { useEffect } from 'react';
import clsx from 'clsx';

// Stores
import { useSharedStore } from '../../../../shared/stores/use-shared-store.hook';

// Styles
import styles from './About.module.scss';

const About = () => {
  // Settings store state
  const [setPageTitle] = useSharedStore((state) => [state.setPageTitle]);

  // Set page title on component mount
  useEffect(() => {
    setPageTitle({ document: 'About', text: 'About' });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {process.env.REACT_APP_ABOUT && (
        <div
          className={clsx(styles['about'], 'page-common')}
          dangerouslySetInnerHTML={{ __html: process.env.REACT_APP_ABOUT }}
        ></div>
      )}
    </>
  );
};

export default About;
