import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import {history} from '../../helpers/history';
import Login from './LoginPage/Login';
import Home from './HomePage/Home';
import AboutUs from './HomePage/AboutUs';
import Header from './Header';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from "@material-ui/core/Typography";
import '../styles/App.css';
import LoginForm from "./LoginPage/LoginForm";
import QuestionForm from "./QuestionForm";
import QuestionEntry from "./QuestionEntry";
import QuestionView from "./QuestionView";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Toolbar from "@material-ui/core/Toolbar";

class App extends React.Component {
  render() {
    return (
        <div>
          <Router history={history}>
              <Header/>
              <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/questions">
                    <QuestionView/>
                </Route>
                <Route path="/aboutUs">
                    <AboutUs/>
                </Route>
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
