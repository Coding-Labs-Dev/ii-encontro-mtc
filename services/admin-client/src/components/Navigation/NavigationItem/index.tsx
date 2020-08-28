import React from 'react';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
  Box,
} from '@material-ui/core';

import { NavigationLink } from 'config/navigation';
import { usePrefix } from 'utils/i18n';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

const t = usePrefix('Navigation');

interface CollpaseListProps {
  isOpen: boolean;
}

interface NavigationItemProps extends NavigationLink {
  inset?: boolean;
}

const useStyles = makeStyles(theme => ({
  gutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  root: {
    minWidth: theme.spacing(4),
  },
  inset: {
    paddingLeft: theme.spacing(4),
  },
  active: {
    color: theme.palette.primary.main,
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '3px',
      borderRadius: '5px',
      margin: '12px 0',
      backgroundColor: theme.palette.primary.main,
    },
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
}));

const CollapseList: React.FC<CollpaseListProps> = ({ isOpen, children }) => (
  <Collapse in={isOpen}>
    <List component="div">{children}</List>
  </Collapse>
);

const NavigationItem: React.FC<NavigationItemProps> = ({
  route,
  i18n,
  icon,
  subItems,
  inset,
}) => {
  const history = useHistory();
  const location = useLocation();

  const hasChildActive = React.useMemo(
    () =>
      subItems
        ? subItems.findIndex(item => item.route === location.pathname) > -1
        : false,
    [location, subItems]
  );

  const [isOpen, setIsOpen] = React.useState(hasChildActive);

  const classes = useStyles();

  const active = route === location.pathname;

  const handleClick = React.useCallback(() => {
    if (subItems?.length) {
      setIsOpen(p => !p);
    } else if (route) {
      history.push(route);
    }
  }, [subItems, setIsOpen]);

  const expandIcon = React.useMemo(() => {
    if (!subItems?.length) return null;
    return (
      <Box>
        {isOpen ? (
          <ExpandMore color={hasChildActive ? 'primary' : 'action'} />
        ) : (
          <ChevronRight
            className={hasChildActive ? '' : classes.secondary}
            color={hasChildActive ? 'primary' : 'secondary'}
          />
        )}
      </Box>
    );
  }, [hasChildActive, subItems, isOpen]);

  return (
    <>
      <ListItem
        button
        disableRipple
        disableTouchRipple
        onClick={handleClick}
        className={`${classes.gutters} ${active ? classes.active : ''}`}
      >
        {icon && <ListItemIcon className={classes.root}>{icon}</ListItemIcon>}
        <ListItemText
          inset={inset}
          className={inset ? classes.inset : ''}
          primaryTypographyProps={{
            variant: 'subtitle2',
            color:
              isOpen || hasChildActive || !subItems?.length
                ? 'inherit'
                : 'textSecondary',
          }}
        >
          {t(i18n)}
        </ListItemText>
        {expandIcon}
      </ListItem>
      {subItems?.length && (
        <CollapseList isOpen={isOpen}>
          {subItems.map(item => (
            <NavigationItem
              key={item.route}
              route={item.route}
              icon={item.icon}
              i18n={item.i18n}
              subItems={item.subItems}
              inset
            />
          ))}
        </CollapseList>
      )}
    </>
  );
};

export default NavigationItem;
