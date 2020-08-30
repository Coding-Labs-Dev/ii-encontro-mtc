/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTable } from 'react-table';
import {
  TableContainer,
  Table as MUITable,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  Theme,
} from '@material-ui/core';
import Typography from 'components/ux/Typography';

import { TableCell } from './styles';
import RefreshButton from './RefreshButton';

export interface Props {
  data: Array<any>;
  columns: Array<any>;
  toolbar?: {
    refresh?: {
      onClick: () => void;
      isLoading: boolean;
    };
  };
}

const Table: React.FC<Props> = ({ columns, data, toolbar }) => {
  const tableInstance = useTable({ columns, data });
  const theme = useTheme<Theme>();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const Toolbar = React.useCallback(() => {
    if (!toolbar) return null;
    const { refresh } = toolbar;
    const Refresh: React.FC = () =>
      refresh ? <RefreshButton {...refresh} /> : null;

    return (
      <Box
        pb={`${theme.spacing(1)}px`}
        display="flex"
        justifyContent="flex-end"
      >
        <Box display="grid" gridGap={theme.spacing(2)} gridAutoColumns="1fr">
          <Refresh />
        </Box>
      </Box>
    );
  }, [toolbar]);

  return (
    <>
      <Toolbar />
      <TableContainer component={Paper}>
        <MUITable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    <Typography variant="button" color="textSecondary">
                      {column.render('Header')}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        <Typography variant="body2">
                          {cell.render('Cell')}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
        {!rows.length && (
          <Box py={1}>
            <Typography text="UX.Table.NoData" align="center" />
          </Box>
        )}
      </TableContainer>
    </>
  );
};

export default Table;
