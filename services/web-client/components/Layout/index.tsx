import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

import { Props } from './Layout';
import Footer from 'components/Footer';
import { Box } from '@material-ui/core';

const Layout: NextPage<Props> = ({ children, title, description, og }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={og ? og.title : title} />
      <meta name="og:description" content={og ? og.description : description} />
      <meta
        name="og:image"
        content={og ? og.image : '/images/profile-min.jpg'}
      />
      <meta name="og:url" content={process.env.NEXT_PUBLIC_URL} />
    </Head>
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex="auto">{children}</Box>
      <Footer />
    </Box>
  </>
);

export default Layout;
