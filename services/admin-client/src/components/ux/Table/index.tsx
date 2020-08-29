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
} from '@material-ui/core';
import Typography from 'components/ux/Typography';

import { TableCell } from './styles';

export interface Props {
  data: Array<any>;
  columns: Array<any>;
}

const Table: React.FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
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
  );
};

export default Table;
