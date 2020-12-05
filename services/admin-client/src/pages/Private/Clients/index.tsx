/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { getClients, getFetchStatus } from 'store/Clients/selectors';
import { fetchClients } from 'store/Clients/actions';

import { Container, Box, IconButton } from '@material-ui/core';
import { FaEye } from 'react-icons/fa';

import { withPrefix } from 'components/ux/Typography';
import Table from 'components/ux/Table';
import { useColumnsWithI18n } from '~/components/ux/Table/useColumnsWithI18n';
import { Client } from '~/store/Clients/types';
import ClientModal from '~/components/Client';
import { parsePhoneNumber } from '~/utils/string';

const Typography = withPrefix('Pages.Clients');

const Clients: React.FC = () => {
  const dispatch = useDispatch();
  const [modalData, setModalData] = React.useState<Client | null>(null);
  const state = useSelector((rootState: RootState) => rootState);
  const clients = getClients(state);
  const fetchStatus = getFetchStatus(state);

  React.useEffect(() => {
    if (fetchStatus !== 'fetched') dispatch(fetchClients());
  }, []);

  React.useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const columns = useColumnsWithI18n(
    [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Local',
        accessor: 'location',
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
        Cell: ({ cell: { value } }) => parsePhoneNumber(value),
      },
      {
        Header: 'View',
        Cell: data => (
          <IconButton
            onClick={() => {
              console.log(data.row.original);
              console.log(data.row);
              setModalData(data.row.original);
            }}
          >
            <FaEye fontSize={18} />
          </IconButton>
        ),
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
            isLoading={fetchStatus === 'fetching'}
            columns={columns}
            data={clients.toJS()}
            toolbar={{
              refresh: {
                onClick: () => dispatch(fetchClients()),
                isLoading: fetchStatus === 'fetching',
              },
              print: true,
            }}
            plugins={['exportData']}
          />
        </Box>
      </Container>
      <ClientModal
        open={!!modalData}
        onClose={() => setModalData(null)}
        client={modalData}
      />
    </Box>
  );
};

export default Clients;
