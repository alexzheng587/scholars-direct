import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';
import '../styles/Header.css';
import { connect } from 'react-redux';
import {userAction} from "../../actions/userAction";
import { history } from '../../helpers/history';

const useStyles = makeStyles((theme) => ({
    navbar: {
        background: "#43D1AF"
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        color: 'white',
        marginRight: theme.spacing(2),
    },
    menuItem: {
        marginLeft: 16,
        marginRight: 2
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: 2
    },
    title: {
        flexGrow: 1,
        marginRight: 16,
        marginLeft: -12
    },
}));

function Header(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(props.auth);


    const handleLogout = () => {
        handleClose();
        userAction.logout();
        history.push("/login");
    }
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
        <Toolbar>
            <Link to="/" >
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <HomeIcon />
            </IconButton>
            </Link>

            <Typography variant="h7" className={classes.menuItem}>
                <Link to="/questions" style={{ textDecoration: 'none', color: "#FFF", }}>
                    Questions
                </Link>
            </Typography>

            <Typography variant="h7" className={classes.menuItem}>
                <Link to="/aboutUs" style={{ textDecoration: 'none', color: "#FFF", }}>
                    About Us
                </Link>
            </Typography>

            <Typography variant="h7" className={classes.menuItem}>
                <Link to="/roomSelect" style={{ textDecoration: 'none', color: "#FFF", }}>
                    Select Room
                </Link>
            </Typography>

            {!props.auth.loggedIn && (
                <div>
                    <Typography variant="h7" className={classes.menuItem}>
                        <Link to="/login" style={{ textDecoration: 'none', color: "#FFF", }}>
                            Login
                        </Link>
                    </Typography>
                </div>
            )}
            {props.auth.loggedIn && (
                <section className={classes.rightToolbar}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </section>
            )}
        </Toolbar>
        </AppBar>
        </div>
    );
}
const mapStateToProps = (state) => { //name is by convention
    return { auth: state.authentication}; //now it will appear as props
};

export default connect(mapStateToProps, {})(Header);


