import React from 'react';
import t from 'lib/i18n';

import Layout from 'components/Layout';
import Hero from 'components/Hero';

const IndexPage = () => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Hero />
  </Layout>
);

export default IndexPage;
