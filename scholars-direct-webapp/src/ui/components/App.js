import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {history} from '../../helpers/history';
import Home from './HomePage/Home';
import AboutUs from './HomePage/AboutUs';
import Header from './Header';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from "@material-ui/core/Typography";
import '../styles/App.css';
import {Login} from './LoginPage/Login.jsx';
import QuestionPage from "./QuestionPage/QuestionPage";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Toolbar from "@material-ui/core/Toolbar";
import VideoChat from "./VideoChat/VideoChat";
import { SelectRoom } from "./VideoChat/SelectRoom";
import {RegisterPage} from './RegisterPage/Register.jsx';

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
                            <QuestionPage/>
                        </Route>
                        <Route path="/aboutUs">
                            <AboutUs/>
                        </Route>
                        <Route exact path="/login" component={Login}>
                            <Login/>
                        </Route>
                        <Route exact path="/register" component={RegisterPage}>
                            <RegisterPage/>
                        </Route>
                        <Route exact path="/roomSelect" component={SelectRoom}/>
                        <Route exact path="/:roomId" component={VideoChat}/>
                    </Switch>
                </Router>
                <Divider/>
                <BottomNavigation value="footer" showLabels>
                    <Typography variant="caption" align={"center"}>
                        © Copyright 2020
                    </Typography>
                </BottomNavigation>
            </div>
        );

    }
}

export default App;

