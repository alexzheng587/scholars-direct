import { Router, Switch, Route } from 'react-router-dom';
import {history} from './helpers/history';
import Login from './ui/LoginPage/Login';
import Home from './ui/HomePage/Home';
import AboutUs from './ui/HomePage/AboutUs';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from "@material-ui/core/Typography";
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Box from '@material-ui/core/Box';
import Post from './ui/components/Post.js';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.Component {

    render() {
    return (
        <Layout>
            <Header style={{ zIndex: 1, width: '100%'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '55px' }}>
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <Menu.Item key="2">Make a new post</Menu.Item>
                    <Menu.Item key="3">Account</Menu.Item>
                </Menu>
            </Header>
            <Layout>
            <Sider  theme="light" width={200} className="site-layout-background">
                <div>FILTER BOX</div>
            </Sider>
                <Layout>
                    <Content
                        className="site-layout-background"
                        style={{
                            display: "inline-block",
                            padding: 24,
                            margin: 0,
                            minHeight: 500,
                        }}
                    >
                        {/*<Box minWidth = {40} minHeight="100%" bgcolor= '#cfd8dc' >Filter box</Box>*/}
                        <Box display="flex" flexWrap="wrap" p={1} bgcolor="background.paper" minWidth={100} minHeight={100}>

                            {generatePosts(listExamples)}
                        </Box>

                    </Content>
                </Layout>
            </Layout>
        </Layout>

    );
  }
}
function generatePosts(array) {
    return array.map((item)=>{return <Box><Post post={item}/></Box>});
}
export default App;


let example = {
    "title": "How to solve this calculus problem?",
    "student": "Bob103",
    "description": "I need help with math 101 homework, here is the question: x+y=z....",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["math", "calculus", "math101"],
    "img": 'www.sdadaddadadad.com/dasd'
};
let listExamples = [{
    "title": "How to solve this calculus problem?",
    "student": "Bob103",
    "description": "I need help with math 101 homework, here is the question: x+y=z....",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["math", "calculus", "math101"],
    "img": 'www.sdadaddadadad.com/dasd'
},{
    "title": "How to draw UML Diagram",
    "student": "Bob103",
    "description": "Teach me how to draw UML, The Unified Modeling Language (UML) is a general-purpose, developmental, modeling language in the field of software engineering that is intended to provide",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["CS", "CPSC 210"],
    "img": 'www.sdadaddadadad.com/dasd'
},{
    "title": "Need help debugging",
    "student": "Bob103",
    "description": "need help with my howework",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["CPSC 310",],
    "img": 'www.sdadaddadadad.com/dasd'
},{
    "title": "Help me with 313",
    "student": "Bob103",
    "description": "I need help with CPSC313 homework, here is the question: x+y=z....",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": [ "CPSC 313"],
    "img": 'www.sdadaddadadad.com/dasd'
},{
    "title": "How to solve this calculus problem?",
    "student": "Bob103",
    "description": "I need help with math 101 homework, here is the question: x+y=z....",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["math", "calculus", "math101"],
    "img": 'www.sdadaddadadad.com/dasd'
}];

// Old code
//
// return (
//     <div>
//         <Router history={history}>
//             <Header />
//             <Switch>
//                 <Route component={Login} path="/login" />
//                 <Route component={AboutUs} path="/aboutUs" />
//                 <Route component={Home} path="/" />
//             </Switch>
//         </Router>
//         <Divider />
//         <BottomNavigation value="footer" showLabels >
//             <Typography variant="caption" align={"center"}>
//                 © Copyright 2020
//             </Typography>
//         </BottomNavigation>
//     </div>
// );