import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';

// Components
import { Icon } from '../../ui/Icon/Icon';
import { IconButton } from '../../ui/IconButton/IconButton';
import { IconTextButton } from '../../ui/IconTextButton/IconTextButton';
import { TextButton } from '../../ui/TextButton/TextButton';
import { TextField } from '../../ui/TextField/TextField';

// Hooks
import { useBreakpoints } from '../../hooks/use-breakpoints.hook';
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
  const { smDown } = useBreakpoints();
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

  // Refs
  const menuXsRef = useRef<HTMLDivElement | null>(null);

  // ####### //
  // EFFECTS //
  // ####### //

  // Close small devices menu on resize to bigger window width
  useEffect(() => {
    !smDown && onMenuXsClose();
    // eslint-disable-next-line
  }, [smDown]);

  /**
   * Handler to close menu.
   */
  const onMenuClose = useCallback(() => {
    setMenu(false);
    // eslint-disable-next-line
  }, []);

  /**
   * Handler to close xs menu.
   */
  const onMenuXsClose = useCallback(() => {
    if (menuXsRef.current) {
      menuXsRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      if (menuXsRef.current) {
        menuXsRef.current.style.display = 'none';
        document.body.style.overflow = 'initial';
      }
    }, 250);
  }, [menuXsRef]);

  /**
   * Handler to open xs menu.
   */
  const onMenuXsOpen = useCallback(() => {
    if (menuXsRef.current) {
      document.body.style.overflow = 'hidden';
      menuXsRef.current.style.display = 'flex';
      setTimeout(() => {
        if (menuXsRef.current) {
          menuXsRef.current.style.opacity = '1';
        }
      }, 10);
    }
  }, [menuXsRef]);

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
      {smDown && (
        <>
          <div className={styles['menu-xs-header']}>
            <IconButton
              classes={styles['menu-xs-header-search']}
              icon={['fas', 'search']}
            />
            <IconButton
              classes={styles['menu-xs-header-bars']}
              icon={['fas', 'bars']}
              onClick={onMenuXsOpen}
            />
          </div>
          <Box
            className={styles['menu-xs']}
            sx={{ backgroundColor: 'background.paper' }}
            ref={menuXsRef}
          >
            <IconButton
              classes={styles['menu-xs-close']}
              icon={['fas', 'times']}
              onClick={onMenuXsClose}
            />
            <div className={styles['menu-xs-nav']}>
              <Link to="/" className={styles['menu-content-nav-item']}>
                <TextButton size="xtralarge" onClick={onMenuXsClose}>
                  Home
                </TextButton>
              </Link>
              <Link to="about" className={styles['menu-content-nav-item']}>
                <TextButton size="xtralarge" onClick={onMenuXsClose}>
                  About
                </TextButton>
              </Link>
            </div>
            <IconButton
              classes={styles['menu-xs-theme']}
              icon={['fas', theme === Theme.Light ? 'moon' : 'sun']}
              onClick={onThemeToggle}
            />
            <div className={styles['menu-xs-footer']}>
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
            </div>
          </Box>
        </>
      )}
      {!smDown && (
        <div className={styles['menu-sm']}>
          <Link to="about" className={styles['menu-sm-nav-item']}>
            <TextButton size="large" onClick={onMenuClose}>
              About
            </TextButton>
          </Link>
          <IconButton icon={['fas', 'search']} />
          <IconButton
            icon={['fas', theme === Theme.Light ? 'moon' : 'sun']}
            onClick={onThemeToggle}
          />
        </div>
      )}
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
