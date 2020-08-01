import React from 'react';
import Layout from 'components/Layout';
import t from 'lib/i18n';

const IndexPage = () => (
  <Layout title="II Encontro de MTC" description="II Encontro de MTC">
    <div>
      <h1>{t('Title')}</h1>
    </div>
  </Layout>
);

export default IndexPage;
