import React from 'react';
import t from 'lib/i18n';
import axios from 'axios';
import { NextPage, GetStaticProps } from 'next';

import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Speakers from 'components/Speakers';
import Programme from 'components/Programme';
import PaymentPlans from 'components/PaymentPlans';
import Institutes from '@components/Institutes';
import Sponsors from '@components/Sponsors';
import {
  Speakers as SpeakersType,
  Programme as ProgrammeType,
  Subscriptions,
  Institutes as InstitutesType,
  Sponsors as SponsorsType,
} from '../types/models';

interface Props {
  speakers: SpeakersType;
  programme: ProgrammeType;
  subscriptions: Subscriptions;
  institutes: InstitutesType;
  sponsors: SponsorsType;
}

const IndexPage: NextPage<Props> = ({
  speakers,
  programme,
  subscriptions,
  institutes,
  sponsors,
}) => (
  <Layout title={t('Title')} description={t('Subtitle')}>
    <Hero />
    <Speakers speakers={speakers} />
    <Institutes institutes={institutes} />
    <Programme programme={programme} />
    <PaymentPlans subscriptions={subscriptions} />
    <Sponsors sponsors={sponsors} />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const api = 'http://localhost:4000';
  const { data: speakers } = await axios.get(`${api}/speakers`);
  const { data: programme } = await axios.get(`${api}/programme`);
  const { data: subscriptions } = await axios.get(`${api}/subscriptions`);
  const { data: institutes } = await axios.get(`${api}/institutes`);
  const { data: sponsors } = await axios.get(`${api}/sponsors`);
  return {
    props: { speakers, programme, subscriptions, institutes, sponsors },
  };
};

export default IndexPage;
