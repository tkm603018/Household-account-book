import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {CssBaseline} from '@material-ui/core'
import { DB } from './firebase'
import BodiesCreate from './containers/create/BodiesCreate'
import ItemsCreate from './containers/create/ItemsCreate'
import Charts from './containers/Charts'
import Header from './components/header/Header'
import Home from './containers/Home'
import { usePersist } from './components/usePersist'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const ref = DB.ref('bodies');

const App = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [bodies, setBodies] = React.useState()
  const [themeStatus, setThemeStatus] = usePersist('themeStatus', true)

  const muiTheme = createMuiTheme({
    palette: {
      type: themeStatus === true ? 'dark': 'light',
    },
  });

  const handleThemeChange = (e) => {
    setThemeStatus(e.target.checked)
  }

    const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if(!bodies)  {
      ref.on('value', snapshotObj => {
        let data = []
        if (snapshotObj.val()) {
          Object.keys(snapshotObj.val()).forEach((childSnapshotKey) => {
            data.push(JSON.parse(snapshotObj.val()[childSnapshotKey]));
          });
        }
        setBodies(data)
    })}
  },[bodies])

  return (
    <div className={classes.root}>
      <ThemeProvider theme={muiTheme} className="Header-main">
        <CssBaseline />
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          bodies={bodies}
          handleDrawerClose={handleDrawerClose}
          themeStatus={themeStatus}
          handleThemeChange={handleThemeChange}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Router>
            <Switch>
              <Route exact path='/bodiescreate' component={() => BodiesCreate({ bodies })} />
              {bodies && bodies.map((body, i) => (
                <Route key={i} path={"/itemscreate/" + body.link} component={() => ItemsCreate(body)}
                />
              ))
              }
              {bodies && bodies.map((body, i) => (
                <Route key={i} path={"/charts/" + body.link} component={() => Charts(body)} />
              ))
              }
              {bodies && bodies.map((body, i) => (
                <Route key={i} exact path='/' component={() => Home(body)} />
              ))
              }
            </Switch>
          </Router>
        </main>
      </ThemeProvider>
    </div>
  )
}

export default App;
