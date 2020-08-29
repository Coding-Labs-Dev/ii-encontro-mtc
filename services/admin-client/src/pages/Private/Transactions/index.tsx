/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { getTransactions, getFetchStatus } from 'store/Transactions/selectors';
import { fetchTransactions } from 'store/Transactions/actions';

import { Container, Box, useTheme, Theme } from '@material-ui/core';

import { withPrefix } from 'components/ux/Typography';
import Table from 'components/ux/Table';
import { useColumnsWithI18n } from 'components/ux/Table/useColumnsWithI18n';
import RefreshButton from 'components/ux/Table/RefreshButton';

const Typography = withPrefix('Pages.Transactions');

const Transactions: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const transactions = getTransactions(state);
  const fetchStatus = getFetchStatus(state);
  const theme = useTheme<Theme>();

  React.useEffect(() => {
    if (fetchStatus !== 'fetched') dispatch(fetchTransactions());
  }, []);

  const columns = useColumnsWithI18n(
    [
      {
        Header: 'Code',
        accessor: 'code',
      },
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Reference',
        accessor: 'reference',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    'Pages.Transactions.Table.Headers'
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
                onClick={() => dispatch(fetchTransactions())}
              />
            </Box>
          </Box>
          <Table columns={columns} data={transactions.toJS()} />
        </Box>
      </Container>
    </Box>
  );
};

export default Transactions;
