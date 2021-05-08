import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DB } from './firebase'
import BodiesCreate from './containers/create/BodiesCreate'
import ItemsCreate from './containers/create/ItemsCreate'
import Charts from './containers/Charts'
import Setting from './containers/Setting'
import Header from './components/header/Header'
import Home from './containers/Home';
import './App.css'

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(1),
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
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: "dark",
    },
  });

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [bodies, setBodies] = React.useState()

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="App"
      style={{ display: `flex`, maxWidth: `${window.innerWidth*0.95}`, height: `auto` }}
    >
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        bodies={bodies}
        handleDrawerClose={handleDrawerClose}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Router>
          <Switch>
            {/* <Route exact path='/setting' component={Setting} /> */}
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
        <center>
          <span style={{ lineHeight: `2.0rem` }}>
            © {new Date().getFullYear()}, All rights reserved Tkmmm.
          </span>
        </center>
      </main>
      </div>
    </ThemeProvider>

  )
}

export default App;
