import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box, Drawer, Divider, ListItem,
  Toolbar, AppBar, Typography, IconButton,
  Button, Switch, Tooltip, Link
} from '@material-ui/core';

import {
  Mail as MailIcon,
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AddCircle as　AddCircleIcon
} from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));
const Header = ({ open, handleDrawerOpen, handleDrawerClose, bodies, themeStatus, handleThemeChange }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Button href="/" components={Link}>
            <Box fontWeight="bold" fontSize="1.5rem">家計簿</Box>
          </Button>
        </Toolbar>
        <Box display="flex" overflow="scroll">
        <Button href="/BodiesCreate"><AddCircleIcon color="inherit" /></Button>
          {!bodies ? null : bodies.slice(0).reverse().map((body, i) => (
            <Button key={i} color="inherit" href={"/charts/" + body.link}>
              {body.link.substr(0, 4)}/{body.link.slice(4)}
            </Button>
          ))
          }
        </Box>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </div>
        <Divider />
        <ListItem button >
          <Button
            title="年月を追加する"
            variant="contained"
            color="secondary"
            href="/BodiesCreate"
            fullWidth
          >
            <Box fontWeight="bold">追加する</Box>
          </Button>
        </ListItem>
        <Box display="block" overflow="scroll">
          {!bodies ? null : bodies.slice(0).reverse().map((body, i) => (
            <ListItem button key={i}>
              <Button
                variant="outlined"
                href={"/charts/" + body.link}
                fullWidth
              >
                {body.link.substr(0, 4)}年{body.link.slice(4)}月
              </Button>
            </ListItem>
          ))
          }
        </Box>
        <Divider />
        <ListItem>
          <Tooltip title="テーマを切り替えます"  placement="right">
            <Switch
              checked={themeStatus}
              onChange={handleThemeChange}
              name="Dark-Mode"
              inputProps={{ 'aria-label': 'default checkbox' }}
            />
          </Tooltip>
          テーマを変更する
        </ListItem>
      </Drawer>
    </div>
  )
}
export default Header;
