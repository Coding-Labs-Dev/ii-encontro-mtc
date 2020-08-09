import React from 'react';
import t from 'lib/i18n';

import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Speakers from 'components/Speakers';
import Programme from 'components/Programme';
import PaymentPlans from 'components/PaymentPlans';
import Institutes from '@components/Institutes';

const IndexPage = () => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Hero />
    <Speakers />
    <Institutes />
    <Programme />
    <PaymentPlans />
  </Layout>
);

export default IndexPage;
