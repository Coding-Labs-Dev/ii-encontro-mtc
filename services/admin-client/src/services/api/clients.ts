import api, { parseError } from 'services/api';
import { Client } from '~/store/Clients/types';

export const getClients = (): Promise<Array<Client>> =>
  api
    .get('/admin/clients', {
      withCredentials: true,
    })
    .then(response => response.data.clients)
    .catch(parseError);
