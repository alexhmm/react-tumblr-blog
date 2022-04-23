import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faFacebook as fabFacebook,
  faGithub as fabGithub,
  faInstagram as fabInstagram,
  faTiktok as fabTiktok,
  faTwitch as fabTwitch,
  faTwitter as fabTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright as farCopyright } from '@fortawesome/free-regular-svg-icons';

import {
  faChevronLeft as fasChevronLeft,
  faTimes as fasTimes,
} from '@fortawesome/free-solid-svg-icons';

// Add icons to library to use them in the app
library.add(
  fasChevronLeft,
  farCopyright,
  fabFacebook,
  fabGithub,
  fabInstagram,
  fabTiktok,
  fasTimes,
  fabTwitch,
  fabTwitter
);
