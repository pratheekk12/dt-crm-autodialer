import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  ListItem,
  ListItemText
} from '@material-ui/core';
import navBarRoutes from 'src/utils/navBarRoutes';
import Logo from 'src/modules/dashboard-360/components/Logo';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({
  onMobileClose,
  openMobile,
  permissions,
  userRole,
  onLogout
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box height="100%" display="flex" flexDirection="column">
            <Box
              className="MuiAppBar-colorPrimary"
              display="flex"
              justifyContent="center"
              padding={1}
            >
              <a href="/">
                <Logo />
              </a>
            </Box>
            <Box alignItems="center" display="flex" flexDirection="column">
              <List>
                {navBarRoutes(permissions, userRole)
                  .filter(role => role.isVisible)
                  .map(route => (
                    <ListItemLink
                      href={route.link}
                      key={route.link}
                      style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        width: '100%'
                      }}
                    >
                      <ListItemText primary={route.title} />
                    </ListItemLink>
                  ))}

                <ListItemLink
                  onClick={() => onLogout()}
                  style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemLink>
              </List>
            </Box>
            <Box flexGrow={1} />
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

NavBar.propTypes = {
  onLogout: PropTypes.func,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
