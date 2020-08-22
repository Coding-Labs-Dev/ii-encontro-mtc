/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Alert } from '~/store/Alert/types';

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="down" />;
};

export interface Props {
  alerts: Alert[];
  removeAlert(id: string | number): void;
}

let displayed: string[] = [];

const Notifier: React.FC<Props> = ({ alerts, removeAlert }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string | number) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    alerts.forEach(
      ({ id, type, content, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(id);
          return;
        }

        if (displayed.includes(id)) return;

        enqueueSnackbar(content, {
          key: id,
          variant: type,
          ...options,
          onClose: (event, reason, thisId) => {
            if (options.onClose) {
              options.onClose(event, reason, thisId);
            }
          },
          onExited: (_, thisId) => {
            removeAlert(thisId);
            removeDisplayed(thisId);
          },
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 6000,
          TransitionComponent: SlideTransition,
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(id);
      }
    );
  }, [alerts, closeSnackbar, enqueueSnackbar, removeAlert]);

  return null;
};

export default Notifier;
