import React from 'react';
import t from 'lib/i18n';

import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Speakers from 'components/Speakers';
import Programme from 'components/Programme';

const IndexPage = () => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Hero />
    <Speakers />
    <Programme />
  </Layout>
);

export default IndexPage;
