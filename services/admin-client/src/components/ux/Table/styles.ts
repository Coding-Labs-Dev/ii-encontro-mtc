import { TableCell as MUITableCell, withStyles } from '@material-ui/core';

export const TableCell = withStyles(theme => ({
  head: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    padding: '8px 16px',
  },
  body: {
    border: 'none',
  },
}))(MUITableCell);
