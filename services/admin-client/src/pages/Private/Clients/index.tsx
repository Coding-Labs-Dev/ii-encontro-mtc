/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { getClients, getFetchStatus } from 'store/Clients/selectors';
import { fetchClients } from 'store/Clients/actions';

import { Container, Box } from '@material-ui/core';

import { withPrefix } from 'components/ux/Typography';
import Table from 'components/ux/Table';
import { useColumnsWithI18n } from '~/components/ux/Table/useColumnsWithI18n';

const Typography = withPrefix('Pages.Clients');

const Clients: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const clients = getClients(state);
  const fetchStatus = getFetchStatus(state);

  React.useEffect(() => {
    if (fetchStatus !== 'fetched') dispatch(fetchClients());
  }, []);

  const columns = useColumnsWithI18n(
    [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'CPF',
        accessor: 'cpf',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    ],
    'Pages.Clients.Table.Headers'
  );

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h5" text="Title" />
        <Box my={4}>
          <Table
            columns={columns}
            data={clients.toJS()}
            toolbar={{
              refresh: {
                onClick: () => dispatch(fetchClients()),
                isLoading: fetchStatus === 'fetching',
              },
              print: true,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Clients;
