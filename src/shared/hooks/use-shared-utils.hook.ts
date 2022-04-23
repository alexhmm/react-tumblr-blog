// Models
import { MenuExternalLink } from '../models/shared.types';

// Storess
import { SharedState, useSharedStore } from '../stores/use-shared-store.hook';
import { Theme } from '../models/theme.enum';

export const useSharedUtils = () => {
  // Shared store state
  const [theme] = useSharedStore((state: SharedState) => [state.theme]);

  /**
   * Sets application header meta data.
   */
  const appMetaDataSet = (): void => {
    // Set description
    const descriptionElem = document.getElementById('description');
    descriptionElem &&
      process.env.REACT_APP_META_DESCRIPTION &&
      descriptionElem.setAttribute(
        'content',
        process.env.REACT_APP_META_DESCRIPTION
      );

    // Set favicon
    const faviconElem = document.getElementById('favicon');
    faviconElem &&
      process.env.REACT_APP_META_FAVICON &&
      faviconElem.setAttribute('href', process.env.REACT_APP_META_FAVICON);

    // Set theme color
    const themeColorElem = document.getElementById('theme-color');
    if (themeColorElem) {
      const color = theme === Theme.Light ? '#fafafa' : '#1f1f1f';
      themeColorElem.setAttribute('content', color);
    }

    // Set manifest
    // Extract start url
    const fullUrl = window.location.href;
    const start_url = fullUrl.substr(0, fullUrl.indexOf('/', 8));

    // https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-in-pwa-and-reactjs
    const manifestObj = {
      background_color: theme === Theme.Light ? '#fafafa' : '#1f1f1f',
      description:
        process.env.REACT_APP_META_DESCRIPTION &&
        process.env.REACT_APP_META_DESCRIPTION,
      display: 'standalone',
      icons: [
        {
          sizes: '64x64',
          src:
            process.env.REACT_APP_META_FAVICON64 &&
            process.env.REACT_APP_META_FAVICON64,
          type: 'image/png',
        },
        {
          sizes: '192x192',
          src:
            process.env.REACT_APP_META_FAVICON192 &&
            process.env.REACT_APP_META_FAVICON192,
          type: 'image/png',
        },
        {
          sizes: '512x512',
          src:
            process.env.REACT_APP_META_FAVICON512 &&
            process.env.REACT_APP_META_FAVICON512,
          type: 'image/png',
        },
      ],
      name: process.env.REACT_APP_TITLE && process.env.REACT_APP_TITLE,
      short_name: process.env.REACT_APP_TITLE && process.env.REACT_APP_TITLE,
      start_url,
      theme_color: theme === Theme.Light ? '#fafafa' : '#1f1f1f',
    };

    const manifestStr = JSON.stringify(manifestObj);
    const manifestBlob = new Blob([manifestStr], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(manifestBlob);
    const manifestElem = document.getElementById('manifest');
    if (manifestElem) {
      manifestElem.setAttribute('href', manifestURL);
    }
  };

  /**
   * Returns social menu links by environment variables.
   * @returns MenuSocialLink array
   */
  const menuExternalLinksGet = (): MenuExternalLink[] => {
    const externalLinks: MenuExternalLink[] = [];
    if (process.env.REACT_APP_SOCIAL_FACEBOOK) {
      externalLinks.push({
        icon: ['fab', 'facebook'],
        title: process.env.REACT_APP_SOCIAL_FACEBOOK,
        to: `https://www.facebook.com/${process.env.REACT_APP_SOCIAL_FACEBOOK}`,
      });
    }
    if (process.env.REACT_APP_SOCIAL_GITHUB) {
      externalLinks.push({
        icon: ['fab', 'github'],
        title: process.env.REACT_APP_SOCIAL_GITHUB,
        to: `https://www.github.com/${process.env.REACT_APP_SOCIAL_GITHUB}`,
      });
    }
    if (process.env.REACT_APP_SOCIAL_INSTAGRAM) {
      externalLinks.push({
        icon: ['fab', 'instagram'],
        title: process.env.REACT_APP_SOCIAL_INSTAGRAM,
        to: `https://instagram.com/${process.env.REACT_APP_SOCIAL_INSTAGRAM}`,
      });
    }
    if (process.env.REACT_APP_SOCIAL_TIKTOK) {
      externalLinks.push({
        icon: ['fab', 'tiktok'],
        title: process.env.REACT_APP_SOCIAL_TIKTOK,
        to: `https://www.tiktok.com/@${process.env.REACT_APP_SOCIAL_TIKTOK}`,
      });
    }
    if (process.env.REACT_APP_SOCIAL_TWITCH) {
      externalLinks.push({
        icon: ['fab', 'twitch'],
        title: process.env.REACT_APP_SOCIAL_TWITCH,
        to: `https://www.twitch.tv/${process.env.REACT_APP_SOCIAL_TWITCH}`,
      });
    }
    if (process.env.REACT_APP_SOCIAL_TWITTER) {
      externalLinks.push({
        icon: ['fab', 'twitter'],
        title: process.env.REACT_APP_SOCIAL_TWITTER,
        to: `https://twitter.com/${process.env.REACT_APP_SOCIAL_TWITTER}`,
      });
    }
    return externalLinks;
  };

  return {
    appMetaDataSet,
    menuExternalLinksGet,
  };
};
