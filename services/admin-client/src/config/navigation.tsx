import React from 'react';
import { Apps, People } from '@material-ui/icons';

export interface NavigationLink {
  i18n: string;
  route?: string;
  icon?: React.ReactNode;
  subItems?: Array<NavigationLink>;
}

const navigationLinks: Array<NavigationLink> = [
  {
    i18n: 'Dashboard.Title',
    route: '/',
    icon: <Apps />,
  },
  {
    i18n: 'Clients.Title',
    route: '/clients',
    icon: <People />,
  },
];

export default navigationLinks;
