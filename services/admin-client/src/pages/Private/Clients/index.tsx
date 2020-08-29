/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { getClients, getFetchStatus } from 'store/Clients/selectos';
import { fetchClients } from 'store/Clients/actions';

import { Container, Box, useTheme, Theme } from '@material-ui/core';

import { usePrefix } from 'utils/i18n';
import { withPrefix } from 'components/ux/Typography';
import Table from 'components/ux/Table';
import RefreshButton from 'components/ux/Table/RefreshButton';

const Typography = withPrefix('Pages.Clients');

const t = usePrefix('Pages.Clients.Table.Headers');

const Clients: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const clients = getClients(state);
  const fetchStatus = getFetchStatus(state);
  const theme = useTheme<Theme>();

  React.useEffect(() => {
    if (fetchStatus !== 'fetched') dispatch(fetchClients());
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: t('Name'),
        accessor: 'name',
      },
      {
        Header: t('CPF'),
        accessor: 'cpf',
      },
      {
        Header: t('Email'),
        accessor: 'email',
      },
      {
        Header: t('Phone'),
        accessor: 'phone',
      },
    ],
    []
  );

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h5" text="Title" />
        <Box my={4}>
          <Box
            pb={`${theme.spacing(1)}px`}
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="grid"
              gridGap={theme.spacing(2)}
              gridAutoColumns="1fr"
            >
              <RefreshButton
                isLoading={fetchStatus === 'fetching'}
                onClick={() => dispatch(fetchClients())}
              />
            </Box>
          </Box>
          <Table columns={columns} data={clients.toJS()} />
        </Box>
      </Container>
    </Box>
  );
};

export default Clients;
