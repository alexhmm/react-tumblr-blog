import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { SearchIcon } from '@heroicons/react/outline';
import { MenuAlt3Icon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/solid';

// Components
import { IconTextButton } from '../../ui/IconTextButton/IconTextButton';
import { HeroIconButton } from '../../ui/HeroIconButton/HeroIconButton';
import { TextButton } from '../../ui/TextButton/TextButton';

// Hooks
import { useShared } from '../../hooks/use-shared.hook';

// Models
import { MenuExternalLink, Theme } from '../../models/shared.types';

// Stores
import { useSharedStore } from '../../stores/use-shared-store.hook';

// Styles
import styles from './Menu.module.scss';

export const Menu = () => {
  const { menuExternalLinksGet } = useShared();

  // Component state
  // const [searchValue, setSearchValue] = useState<string>('');

  // User store state
  const [theme, setSearch, setTheme] = useSharedStore((state) => [
    state.theme,
    state.setSearch,
    state.setTheme,
  ]);

  // Refs
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBackdropRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handler to close menu.
   */
  const onMenuClose = useCallback(() => {
    if (menuBackdropRef.current) {
      menuBackdropRef.current.style.opacity = '0';
    }
    if (menuContentRef.current) {
      menuContentRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.style.display = 'none';
      }
      if (menuBackdropRef.current) {
        menuBackdropRef.current.style.display = 'none';
      }
      if (menuContentRef.current) {
        menuContentRef.current.style.display = 'none';
        document.body.style.overflow = 'initial';
      }
    }, 250);
  }, [menuContentRef]);

  /**
   * Handler to open menu.
   */
  const onMenuOpen = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.style.display = 'block';
    }
    if (menuBackdropRef.current) {
      menuBackdropRef.current.style.display = 'block';
      setTimeout(() => {
        if (menuBackdropRef.current) {
          menuBackdropRef.current.style.opacity = '1';
        }
      }, 10);
    }
    if (menuContentRef.current) {
      document.body.style.overflow = 'hidden';
      menuContentRef.current.style.display = 'flex';
      setTimeout(() => {
        if (menuContentRef.current) {
          menuContentRef.current.style.opacity = '1';
        }
      }, 10);
    }
  }, [menuContentRef]);

  /**
   * Handler to toggle application theme.
   */
  const onThemeToggle = useCallback(() => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    // eslint-disable-next-line
  }, [theme]);

  return (
    <>
      <div className={styles['menu-buttons']}>
        <HeroIconButton arlabel="Search" onClick={() => setSearch(true)}>
          <SearchIcon />
        </HeroIconButton>
        <HeroIconButton arlabel="Toggle theme" onClick={onThemeToggle}>
          {theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
        </HeroIconButton>
        <HeroIconButton arlabel="Menu" onClick={onMenuOpen}>
          <MenuAlt3Icon />
        </HeroIconButton>
      </div>
      <div className={styles['menu']} ref={menuRef}>
        <div
          className={styles['menu-backdrop']}
          onClick={onMenuClose}
          ref={menuBackdropRef}
        />
        <Box
          className={styles['menu-content']}
          sx={{ backgroundColor: 'background.paper' }}
          ref={menuContentRef}
        >
          <div className={styles['menu-content-top']}>
            <HeroIconButton
              arlabel="Close menu"
              classes={styles['menu-content-top-close']}
              onClick={onMenuClose}
            >
              <XIcon />
            </HeroIconButton>
            <div className={styles['menu-content-top-nav']}>
              <Link to="/" className={styles['menu-content-top-nav-item']}>
                <TextButton size="xtralarge" onClick={onMenuClose}>
                  Home
                </TextButton>
              </Link>
              <Link to="about" className={styles['menu-content-top-nav-item']}>
                <TextButton size="xtralarge" onClick={onMenuClose}>
                  About
                </TextButton>
              </Link>
            </div>
          </div>
          <div className={styles['menu-content-bottom']}>
            <Box className={styles['menu-content-bottom-social-media']}>
              {menuExternalLinksGet().map(
                (link: MenuExternalLink, index: number) => (
                  <a
                    key={index}
                    href={link.to}
                    rel="noreferrer"
                    target="_blank"
                    className={styles['menu-content-bottom-social-media-item']}
                  >
                    <IconTextButton icon={link.icon}>
                      {link.title}
                    </IconTextButton>
                  </a>
                )
              )}
            </Box>
            <div className={styles['menu-content-bottom-footer']}>
              <Box
                className={styles['menu-content-bottom-footer-copyright']}
                sx={{ color: 'text.secondary' }}
              >
                © {process.env.REACT_APP_COPYRIGHT}
              </Box>
              <div>
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
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};
