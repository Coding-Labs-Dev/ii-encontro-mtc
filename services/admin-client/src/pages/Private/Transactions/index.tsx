/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { getTransactions, getFetchStatus } from 'store/Transactions/selectors';
import { fetchTransactions } from 'store/Transactions/actions';

import { Container, Box } from '@material-ui/core';

import { withPrefix } from 'components/ux/Typography';
import Table from 'components/ux/Table';
import { useColumnsWithI18n } from 'components/ux/Table/useColumnsWithI18n';

const Typography = withPrefix('Pages.Transactions');

const Transactions: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const transactions = getTransactions(state);
  const fetchStatus = getFetchStatus(state);

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
          <Table
            isLoading={fetchStatus === 'fetching'}
            columns={columns}
            data={transactions.toJS()}
            toolbar={{
              refresh: {
                onClick: () => dispatch(fetchTransactions()),
                isLoading: fetchStatus === 'fetching',
              },
              print: true,
            }}
            plugins={['exportData']}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Transactions;
