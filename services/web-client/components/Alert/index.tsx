import React from 'react';
import { useSnackbar } from 'notistack';

import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="down" />;
};

interface CreateAlertParams {
  content: string;
  id?: string;
  type: 'default' | 'error' | 'success' | 'warning' | 'info';
  options?: any;
}

const useAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createAlert = (params: CreateAlertParams) => {
    const { content, type, options = {} } = params;
    enqueueSnackbar(content, {
      // key: id,
      variant: type,
      ...options,
      onClose: (event, reason, thisId) => {
        if (options.onClose) {
          options.onClose(event, reason, thisId);
        }
      },
      // onExited: (_, thisId) => {
      //   dispatch(removeAlert(thisId));
      //   removeDisplayed(thisId);
      // },
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 6000,
      TransitionComponent: SlideTransition,
    });
  };

  return { createAlert };
};

export default useAlert;
