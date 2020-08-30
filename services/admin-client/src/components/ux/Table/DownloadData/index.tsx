import React from 'react';
import Papa from 'papaparse';
import XLSX from 'xlsx';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { SaveAlt } from '@material-ui/icons';
import { FaFileCsv, FaFilePdf, FaFileExcel } from 'react-icons/fa';

export type DownloadType = 'pdf' | 'csv' | 'xlsx';

type GetExportFileBlob = ({
  columns,
  data,
  fileType,
  fileName,
}: {
  columns: Array<any>;
  data: Array<any>;
  fileType: DownloadType;
  fileName: string;
}) => Blob | false;

export const getExportFileBlob: GetExportFileBlob = ({
  columns,
  data,
  fileType,
  fileName,
}) => {
  if (fileType === 'csv') {
    // CSV example
    const headerNames = columns.map(col => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: 'text/csv' });
  }
  if (fileType === 'xlsx') {
    const header = columns.map(c => c.exportValue);
    const compatibleData = data.map(row => {
      const obj: { [key: string]: any } = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, 'React Table Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    return false;
  }
  if (fileType === 'pdf') {
    const headerNames = columns.map(column => column.exportValue);
    const doc = new JsPDF();
    autoTable(doc, {
      head: [headerNames],
      body: data,
      margin: { top: 20 },
      styles: {
        minCellHeight: 9,
        halign: 'left',
        valign: 'middle',
        fontSize: 11,
      },
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }
  return false;
};

export interface Props {
  download(type: DownloadType, allData: boolean): void;
}

const DownloadData: React.FC<Props> = ({ download }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton size="small" onClick={openMenu}>
        <SaveAlt />
      </IconButton>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => download('csv', true)}>
          <ListItemIcon>
            <FaFileCsv fontSize={24} />
          </ListItemIcon>
          <ListItemText>CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => download('pdf', true)}>
          <ListItemIcon>
            <FaFilePdf fontSize={24} />
          </ListItemIcon>
          <ListItemText>PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => download('xlsx', true)}>
          <ListItemIcon>
            <FaFileExcel fontSize={24} />
          </ListItemIcon>
          <ListItemText>XLSX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DownloadData;
