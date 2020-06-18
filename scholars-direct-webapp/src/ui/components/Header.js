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
    title: {
        flexGrow: 1,
        marginRight: 16,
        marginLeft: -12
    },
}));

export default function Header() {
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

    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.navbar}>
        <Toolbar>
            <Link to="/" >
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <HomeIcon />
            </IconButton>
            </Link>

            <Typography variant="h7" className={classes.title}>
                <Link to="/questions" style={{ textDecoration: 'none' }}>
                    Questions
                </Link>
            </Typography>

            <Typography variant="h7" className={classes.title}>
                <Link to="/aboutUs" style={{ textDecoration: 'none' }}>
                    About Us
                </Link>
            </Typography>

            {auth && (
                <div>
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
                    </Menu>
                </div>
            )}
        </Toolbar>
        </AppBar>
        </div>
    );
}


