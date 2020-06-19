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
import QuestionView from "./QuestionView";


class App extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
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
                        <Route path="/login" component={Login}>
                            <Login/>
                        </Route>
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

