import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';

// Components
import { Icon } from '../../ui/Icon/Icon';
import { IconButton } from '../../ui/IconButton/IconButton';
import { IconTextButton } from '../../ui/IconTextButton/IconTextButton';
import { TextButton } from '../../ui/TextButton/TextButton';
import { TextField } from '../../ui/TextField/TextField';

// Hooks
import { useSharedUtils } from '../../hooks/use-shared-utils.hook';

// Models
import { MenuExternalLink } from '../../models/shared.types';
import { Theme } from '../../models/theme.enum';

// Stores
import {
  SharedState,
  useSharedStore,
} from '../../stores/use-shared-store.hook';

// Styles
import styles from './Menu.module.scss';

export const Menu = () => {
  const navigate = useNavigate();
  const { menuExternalLinksGet } = useSharedUtils();

  // Component state
  const [searchValue, setSearchValue] = useState<string>('');

  // User store state
  const [menu, theme, setMenu, setTheme] = useSharedStore(
    (state: SharedState) => [
      state.menu,
      state.theme,
      state.setMenu,
      state.setTheme,
    ]
  );

  /**
   * Handler to close menu.
   */
  const onMenuClose = useCallback(() => {
    setMenu(false);
    // eslint-disable-next-line
  }, []);

  /**
   * Handler on search value change.
   */
  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  /**
   * Handler to submit search.
   */
  const onSearchSubmit = useCallback(() => {
    if (searchValue && searchValue.length > 1) {
      let searchVal = searchValue;
      if (searchVal.charAt(0) === '#') {
        searchVal = searchVal.substring(1, searchVal.length);
      }
      onMenuClose();
      setSearchValue('');
      navigate('/tagged/' + searchVal.toLocaleLowerCase());
    }
    // eslint-disable-next-line
  }, [searchValue]);

  /**
   * Handler to toggle application theme.
   */
  const onThemeToggle = useCallback(() => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    // eslint-disable-next-line
  }, [theme]);

  return (
    <>
      <TextButton
        classes={styles['menu-button']}
        size="large"
        onClick={() => setMenu(true)}
      >
        Menu
      </TextButton>
      <Drawer
        anchor="right"
        className={styles['menu']}
        open={menu}
        PaperProps={{ className: styles['menu-paper'] }}
        transitionDuration={350}
        onClose={onMenuClose}
      >
        <Box className={styles['menu-content']}>
          <Box className={styles['menu-content-header']}>
            <IconButton
              icon={['fas', theme === Theme.Light ? 'moon' : 'sun']}
              onClick={onThemeToggle}
            />
            <IconButton
              icon={['fas', 'times']}
              onClick={() => setMenu(false)}
            />
          </Box>
          <Box className={styles['menu-content-search']}>
            <IconButton icon={['fas', 'search']} onClick={onSearchSubmit} />
            <TextField
              classes={styles['menu-content-search-text-field']}
              placeholder="Search"
              reset
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
            />
          </Box>
          <Box
            sx={{
              '& a': {
                borderColor: 'transparent',
              },
              '& a:hover': {
                borderColor: 'text.primary',
              },
            }}
            className={styles['menu-content-nav']}
          >
            <Link to="/" className={styles['menu-content-nav-item']}>
              <TextButton size="xtralarge" onClick={onMenuClose}>
                Home
              </TextButton>
            </Link>
            <Link to="about" className={styles['menu-content-nav-item']}>
              <TextButton size="xtralarge" onClick={onMenuClose}>
                About
              </TextButton>
            </Link>
          </Box>
        </Box>
        <Box className={styles['menu-footer']}>
          <Box className={styles['menu-footer-social-media']}>
            {menuExternalLinksGet().map(
              (link: MenuExternalLink, index: number) => (
                <a
                  key={index}
                  href={link.to}
                  rel="noreferrer"
                  target="_blank"
                  className={styles['menu-footer-social-media-item']}
                >
                  <IconTextButton icon={link.icon}>{link.title}</IconTextButton>
                </a>
              )
            )}
          </Box>
          <Box className={styles['menu-footer-info']}>
            {process.env.REACT_APP_COPYRIGHT ? (
              <Box className={styles['menu-footer-info-copyright']}>
                <Icon
                  classes={styles['menu-footer-info-copyright-icon']}
                  icon={['far', 'copyright']}
                  sx={{ color: 'text.secondary' }}
                />
                <Box
                  sx={{ color: 'text.secondary' }}
                  className={styles['menu-footer-info-copyright-text']}
                >
                  {process.env.REACT_APP_COPYRIGHT}
                </Box>
              </Box>
            ) : (
              <Box />
            )}
            <Box className={styles['menu-footer-info-privacy']}>
              <a
                href="https://www.tumblr.com/policy/de/impressum"
                rel="noreferrer"
                target="_blank"
              >
                <TextButton size="xtrasmall">Imprint</TextButton>
              </a>
              <a
                href="https://www.tumblr.com/privacy/de"
                rel="noreferrer"
                target="_blank"
              >
                <TextButton size="xtrasmall">Privacy</TextButton>
              </a>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
