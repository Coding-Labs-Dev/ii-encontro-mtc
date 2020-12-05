import React from 'react';
import moment from 'moment';
import { Box, Dialog, Grid, Typography } from '@material-ui/core';
import { Client } from '~/store/Clients/types';
import { parsePhoneNumber } from '~/utils/string';

const fields: Array<{
  name: string;
  value: keyof Client;
  render?: (row: any, data: Client) => any;
}> = [
  {
    name: 'Nome',
    value: 'name',
  },
  {
    name: 'E-email',
    value: 'email',
  },
  {
    name: 'Telefone',
    value: 'phone',
    render: (phone: string) => parsePhoneNumber(phone),
  },
  {
    name: 'Local',
    value: 'location',
  },
  {
    name: 'CPF',
    value: 'cpf',
  },
  {
    name: 'Data de Nascimento',
    value: 'dob',
    render: (dob: string) => moment.utc(dob).format('DD/MM/YYYY'),
  },
  {
    name: 'Endereço',
    value: 'street',
    render: (_: string, data: Client) => (
      <>
        <Typography>
          {data.street}, {data.number}
        </Typography>
        <Typography>{data.complement}</Typography>
        <Typography>
          {data.district}, {data.state}
        </Typography>
        <Typography>{data.postalCode}</Typography>
      </>
    ),
  },
];

interface Props {
  open: boolean;
  onClose(): void;
  client: Client | null;
}

const ClientModal: React.FC<Props> = ({ open, onClose, client }) => {
  if (!client) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <Box p={4}>
        <Grid container spacing={2}>
          {fields.map(field => (
            <React.Fragment key={field.value}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">{field.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {field.render
                  ? field.render(client[field.value], client)
                  : client[field.value]}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ClientModal;
