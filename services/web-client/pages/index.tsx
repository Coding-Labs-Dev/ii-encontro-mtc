import React from 'react';
import t from 'lib/i18n';

import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Speakers from 'components/Speakers';

const IndexPage = () => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Hero />
    <Speakers />
  </Layout>
);

export default IndexPage;
