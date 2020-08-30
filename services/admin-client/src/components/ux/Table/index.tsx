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
  IconButton,
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { useReactToPrint } from 'react-to-print';

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
    print?: boolean;
  };
}

const Table: React.FC<Props> = ({ columns, data, toolbar }) => {
  const tableInstance = useTable({ columns, data });
  const theme = useTheme<Theme>();
  const tableRef = React.useRef<HTMLTableElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => tableRef?.current,
    pageStyle: 'padding: 100px',
    removeAfterPrint: true,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const Toolbar = React.useCallback(() => {
    if (!toolbar) return null;
    const { refresh, print } = toolbar;

    const Refresh: React.FC = () =>
      refresh ? <RefreshButton {...refresh} /> : null;

    const Print: React.FC = () =>
      print ? (
        <IconButton size="small" onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
      ) : null;

    return (
      <Box
        pb={`${theme.spacing(1)}px`}
        display="flex"
        justifyContent="flex-end"
      >
        <Box
          display="grid"
          gridGap={theme.spacing(2)}
          gridAutoColumns="1fr"
          gridAutoFlow="column"
        >
          <Print />
          <Refresh />
        </Box>
      </Box>
    );
  }, [toolbar]);

  return (
    <>
      <Toolbar />
      <TableContainer component={Paper} ref={tableRef}>
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
