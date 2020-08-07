import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';
import '../styles/Header.css';
import { connect } from 'react-redux';
import {logout, userAction} from "../../actions/userAction";
import { history } from '../../helpers/history';
import { graphql, withApollo } from '@apollo/client/react/hoc';
import { addError, clearError } from '../../actions/error';
import {LOGOUT_MUTATION} from '../../graphql/mutations/user/logout';
import { compose } from 'redux';

const styles = theme => ({
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
});

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            anchorReference: 'anchorEl',
        };

        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
    }

    handleMenu(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose() {
        this.setState({
            anchorEl: null
        });
    };

    handleLogout() { // logoutUser is async
        this.handleClose();
        //const { data } = await props.logoutUser();
        this.props.logout();
        history.push("/login");
    }


    redirectToProfile() {
        this.handleClose();
        history.push("/profile");
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
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
                            <Link to="/videoChat/contacts" style={{ textDecoration: 'none', color: "#FFF", }}>
                                Video Chat
                            </Link>
                        </Typography>

                        <Typography variant="h7" className={classes.menuItem}>
                            <Link to="/aboutUs" style={{ textDecoration: 'none', color: "#FFF", }}>
                                About
                            </Link>
                        </Typography>

                        {!this.props.auth.loggedIn && (
                            <section className={classes.rightToolbar}>
                                <Typography variant="h7" className={classes.menuItem}>
                                    <Link to="/login" style={{ textDecoration: 'none', color: "#FFF", }}>
                                        Login
                                    </Link>
                                </Typography>
                            </section>
                        )}
                        {this.props.auth.loggedIn && (
                            <section className={classes.rightToolbar}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
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
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.redirectToProfile}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </Menu>
                            </section>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authentication
    };
};

Header.propTypes = {
    logoutUser: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { logout, addError, clearError }),
    graphql(LOGOUT_MUTATION, { name: 'logoutUser' }),
)(Header);


