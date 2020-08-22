import { connect } from 'react-redux';
import { RootState } from '~/store/rootState';
import { getAlerts } from '~/store/Alert/selectors';
import { GenericDispatch } from '~/store';
import { removeAlert } from '~/store/Alert/actions';

import Alerts from './Alerts';

const mapStateToProps = (state: RootState) => ({
  alerts: getAlerts(state),
});

const mapDispatchToProps = (dispatch: GenericDispatch) => ({
  removeAlert: (id: string) => dispatch(removeAlert({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
