import { FetchStatus } from 'store/util/fetchStatus';
import { List } from 'immutable';

export interface Client {
  id: string;
  transactions: Array<any>;
  name: string;
  email: string;
  phone: string;
  location: string;
  cpf: string;
  dob: number;
  street: string;
  number: string;
  complement: string;
  district: string;
  state: string;
  postalCode: string;
}

export interface ClientsState {
  fetchStatus: FetchStatus;
  clients: List<Client>;
}
