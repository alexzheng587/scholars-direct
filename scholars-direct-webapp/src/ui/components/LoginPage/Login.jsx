import React from "react";
import {userAction} from '../../../actions/userAction';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {alertActions} from '../../../actions/alertLogin';
import {history} from '../../../helpers/history';
import PropTypes from "prop-types";
import { GoogleLogin } from 'react-google-login';
import config from '../../../config.json';

class Login extends React.Component {


    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });

        // reset login status
        this.props.logout();

        this.state = {
            email: "",
            password: "",
            errors: {},
            loggedIn: false,
            token:'',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    googleResponse = (response) => {
        console.log(response);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("?????????!!!!!!")
        if (nextProps.auth.loggedIn) {
            history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onFailure = (error) => {
        alert(error);
    };
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.setState({submitted: true});

        const data = {
            email: this.state.email,
            password: this.state.password
        }
        if (data.email && data.password) {
            this.props.login(data);
        }
    }

    render() {
        const {loggingIn} = this.props;
        const {email, password, submitted, errors} = this.state;
        console.log(errors)
        return (
            <div className="container">
                <div class="login-form">
                    <h1>Login with your account</h1>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email"
                                   className="form-control is-invalid"
                                   name="email"
                                   value={email}
                                   onChange={this.handleChange}
                                   error={errors.email}
                                   required/>
                            {errors.email &&
                            <div className="invalid">
                                {errors.email}
                            </div>
                          }
                            {errors.emailnotfound &&
                            <div className="invalid">
                                {errors.emailnotfound}
                            </div>
                           }
                        </div>
                        <br></br>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                   className="form-control"
                                   name="password"
                                   value={password}
                                   onChange={this.handleChange}
                                   error={errors.password}
                                   required/>
                            {errors.passwordincorrect &&
                            <div class="invalid">
                                {errors.passwordincorrect}
                            </div>}
                        </div>
                        <br></br>
                        <br></br>
                        <div class="form-group">
                            <button className="btn btn-primary">Login</button>
                            {loggingIn &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            }
                            <Link to="/register" className="btn btn-link">Register</Link>

                        </div>
                    </form>
                    <div>
                        <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                        />
                </div>
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.authentication,
    errors: state.errors
});

const actionCreators = {
    login: userAction.login,
    logout: userAction.logout,
    clearAlerts: alertActions.clear
};

const connectedLogin = connect(mapStateToProps, actionCreators)(Login);
export {connectedLogin as Login};