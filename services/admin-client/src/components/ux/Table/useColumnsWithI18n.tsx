import React from 'react';

import { t, usePrefix } from 'utils/i18n';
import { Column } from 'react-table';

type UseColumns = (
  columns: Array<Column<any>>,
  prefix?: string
) => Array<Column<any>>;

export const useColumnsWithI18n: UseColumns = (columns, prefix) => {
  const getMessage = prefix ? usePrefix(prefix) : t;
  const data = columns.map(column => ({
    ...column,
    Header: getMessage(String(column.Header)),
  }));
  return React.useMemo(() => data, [data, columns, prefix]);
};
