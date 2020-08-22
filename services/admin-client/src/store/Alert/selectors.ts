import { RootState } from '~/store/rootState';

export const getAlerts = (state: RootState) => state.alerts.toJS();