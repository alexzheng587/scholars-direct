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
import QuestionForm from "./QuestionPage/QuestionForm";
import QuestionEntry from "./QuestionPage/QuestionEntry";
import QuestionPage from "./QuestionPage/QuestionPage";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Toolbar from "@material-ui/core/Toolbar";
import VideoChat from "./VideoChat/VideoChat";
import { SelectRoom } from "./VideoChat/SelectRoom";


class App extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            // fix
            //this.props.clearAlerts();
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
                            <QuestionPage/>
                        </Route>
                        <Route path="/aboutUs">
                            <AboutUs/>
                        </Route>
                        <Route path="/login" component={Login}>
                            <Login/>
                        </Route>
                        <Route path="/roomSelect" exact component={SelectRoom}/>
                        <Route path="/:roomId" exact component={VideoChat}/>
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

