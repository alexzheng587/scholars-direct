import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {history} from './helpers/history';
import Login from './ui/LoginPage/Login';
import Home from './ui/HomePage/Home';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from "@material-ui/core/Typography";
import './App.css';

class App extends React.Component {
  render() {
    return (
        <div>
          <Router history={history}>
            <Switch>
              <Route component={Home} path="/" />
              <Route component={Login} path="/login" />
            </Switch>
          </Router>
          <Divider />
          <BottomNavigation value="footer" showLabels >
            <Typography variant="caption" align={"center"}>
              © Copyright 2020
            </Typography>
          </BottomNavigation>
        </div>
    );
  }
}

export default App;
