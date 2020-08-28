import React from 'react';

import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { Badge, IconButton } from '@material-ui/core';

const NotificationIndicator: React.FC = () => {
  return (
    <IconButton size="small">
      <Badge badgeContent={4} variant="dot" color="primary" overlap="circle">
        <NotificationsNoneOutlinedIcon color="action" />
      </Badge>
    </IconButton>
  );
};

export default NotificationIndicator;
