import React from 'react';
//import { Router, Switch, Route } from 'react-router-dom';
import {history} from '../../helpers/history';
import Login from './LoginPage/Login';
import Home from './HomePage/Home';
import AboutUs from './HomePage/AboutUs';
import Header from './Header';
//import Divider from '@material-ui/core/Divider';
//import BottomNavigation from '@material-ui/core/BottomNavigation';
//import Typography from "@material-ui/core/Typography";
import '../styles/App.css';
import LoginForm from "./LoginPage/LoginForm";

class App extends React.Component {
  render() {
    return (
        <div>
            <LoginForm/>
          {/*<Router history={history}>*/}
          {/*  <Header />*/}
          {/*  <Switch>*/}
          {/*    <Route component={Login} path="/login" />*/}
          {/*    <Route component={AboutUs} path="/aboutUs" />*/}
          {/*    <Route component={Home} path="/" />*/}
          {/*  </Switch>*/}
          {/*</Router>*/}
          {/*<Divider />*/}
          {/*<BottomNavigation value="footer" showLabels >*/}
          {/*  <Typography variant="caption" align={"center"}>*/}
          {/*    © Copyright 2020*/}
          {/*  </Typography>*/}
          {/*</BottomNavigation>*/}
        </div>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
