import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface MenuLink {
  title: string;
  to: string;
}

export interface MenuExternalLink extends MenuLink {
  icon: [IconPrefix, IconName];
}

export interface PageTitle {
  document: string;
  text: string;
}
