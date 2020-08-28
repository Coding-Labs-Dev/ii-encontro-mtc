import React from 'react';
import { Apps, AccountBalanceWallet } from '@material-ui/icons';

export interface NavigationLink {
  i18n: string;
  route?: string;
  icon?: React.ReactNode;
  subItems?: Array<NavigationLink>;
}

const navigationLinks: Array<NavigationLink> = [
  {
    i18n: 'Dashboard.Title',
    icon: <Apps />,
    subItems: [
      {
        route: '/dashboard/realtime',
        i18n: 'Dashboard.Realtime',
      },
      {
        route: '/dashboard/audience',
        i18n: 'Dashboard.Audience',
      },
      {
        route: '/dashboard/trafic-source',
        i18n: 'Dashboard.TraficSource',
      },
    ],
  },
  {
    i18n: 'Wallet.Title',
    icon: <AccountBalanceWallet />,
    subItems: [
      {
        route: '/wallet/balance',
        i18n: 'Wallet.Balance',
      },
    ],
  },
];

export default navigationLinks;
