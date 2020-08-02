import React from "react";
import '../../styles/Form.css';
import { userAction } from '../../../actions/userAction';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { alertActions } from '../../../actions/alertLogin';
import { history } from '../../../helpers/history';
import PropTypes from 'prop-types';
import { graphql, withApollo } from '@apollo/client/react/hoc';
import { addError, clearError } from '../../../actions/error';
import { setToken } from '../../../actions/authtoken';
import { login } from '../../../actions/userAction';
import { LOGIN_MUTATION } from '../../../graphql/mutations/user/login';
import { compose } from 'redux';
import {role} from '../../../constants/role';
//import { GoogleLogin } from 'react-google-login';
import config from '../../../config.json';

class Login extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            // this.props.clearAlerts();
        });

        // reset login status
        // this.props.logout();

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
        this.handleError = this.handleError.bind(this)
    }

    googleResponse = (response) => {
        console.log("Google Response:",response);
        const obj = {access_token: response.accessToken,
            role: "STUDENT"
        };
        const tokenBlob = new Blob([JSON.stringify(obj, null, 2)],
            {type : 'application/json'});
        console.log("tokenBlob:",tokenBlob);
        this.props.googleLogin(tokenBlob);
    };

    onFailure = (error) => {
        alert("Fail to log in though Google");
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("?????????!!!!!!");
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

    async handleSubmit(e) {
        try {
            e.preventDefault();
            const {data} = await this.props.loginUser({
                variables: {email: this.state.username.trim(), password: this.state.password},
            });
            if (!data.result) return this.handleError();
            const { success, message, token } = data.result;
            if (!success) return this.handleError(message);
            await new Promise(resolve => this.setState({ submitted: true }, resolve));
            console.log(token);
            this.props.setToken(token);
            this.props.login(this.state.username.trim(), token);
        } catch (err) {
            console.log(err);
            return this.handleError();
        }
    }

    async handleError(error = 'Something went wrong logging you in') {
        await new Promise(resolve => this.setState({ loading: false }, resolve));
        return this.props.addError(error);
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log(nextProps);
    //     if (nextProps.auth.loggedIn) {
    //         console.log("Logged in");
    //         history.push("/"); // push user to dashboard when they login
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.props.auth.loggedIn) {
    //         history.push("/");
    //     }
    // }

    render() {
        //const {alert} = this.props;
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div>
                            <div className="login-form" >
                                <h1>Login with your account</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>

                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                        {submitted && !username &&
                                        <div className="help-block">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                        {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Login</button>
                                        {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/register" className="btn btn-link">Register</Link>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func,
    addError: PropTypes.func,
    clearError: PropTypes.func,
    setToken: PropTypes.func,
    login: PropTypes.func,
    client: PropTypes.shape({
        resetStore: PropTypes.func,
    }),
};

const mapStateToProps = state => ({
    auth: state.authentication
});


const connectedLogin = compose(
    withApollo,
    connect(mapStateToProps, { addError, clearError, setToken, login }),
    graphql(LOGIN_MUTATION, { name: 'loginUser' }),
)(Login);

export { connectedLogin as Login };

// handleSubmit(e) {
//     e.preventDefault();
//     console.log(this.state)
//     this.setState({submitted: true});
//
//     const data = {
//         email: this.state.email,
//         password: this.state.password
//     }
//     if (data.email && data.password) {
//         this.props.login(data);
//     }
// }
//
// render() {
//     const {loggingIn} = this.props;
//     const {email, password, submitted, errors} = this.state;
//     console.log(errors)
//     return (
//         <div className="container">
//             <div class="login-form">
//                 <h1>Login with your account</h1>
//                 <br></br>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input type="email"
//                                className="form-control is-invalid"
//                                name="email"
//                                value={email}
//                                onChange={this.handleChange}
//                                error={errors.email}
//                                required/>
//                         {errors.email &&
//                         <div className="invalid">
//                             {errors.email}
//                         </div>
//                         }
//                         {errors.emailnotfound &&
//                         <div className="invalid">
//                             {errors.emailnotfound}
//                         </div>
//                         }
//                     </div>
//                     <br></br>
//                     <br></br>
//                     <div className="form-group">
//                         <label htmlFor="password">Password:</label>
//                         <input type="password"
//                                className="form-control"
//                                name="password"
//                                value={password}
//                                onChange={this.handleChange}
//                                error={errors.password}
//                                required/>
//                         {errors.passwordincorrect &&
//                         <div class="invalid">
//                             {errors.passwordincorrect}
//                         </div>}
//                     </div>
//                     <br></br>
//                     <br></br>
//                     <div class="form-group">
//                         <button className="btn btn-primary">Login</button>
//                         {loggingIn &&
//                         <img
//                             src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
//                         }
//                         <Link to="/register" className="btn btn-link">Register</Link>
//
//                     </div>
//                 </form>
//                 <div>
//                     <GoogleLogin
//                         clientId={config.GOOGLE_CLIENT_ID}
//                         buttonText="Login"
//                         onSuccess={this.googleResponse}
//                         onFailure={this.onFailure}
//                     />
//                 </div>
//             </div>
//         </div>
//
//     );
// }
// }

// function mapState(state) {
//     const { loggingIn } = state.authentication;
//     const { alert } = state;
//     return { loggingIn,alert };
// }
//
// const actionCreators = {
//     login: userAction.login,
//     logout: userAction.logout,
//     clearAlerts: alertActions.clear
// };
//
// const connectedLogin = connect(mapState, actionCreators)(Login);
// export { connectedLogin as Login};

//     errors: PropTypes.object.isRequired,
//     login: PropTypes.func.isRequired,
//     googleLogin: PropTypes.func.isRequired,
//     logout: PropTypes.func.isRequired,
//     clearAlerts: PropTypes.func.isRequired
// };
//
// const mapStateToProps = state => ({
//     auth: state.authentication,
//     errors: state.errors
// });
//
// const actionCreators = {
//     login: userAction.login,
//     googleLogin: userAction.googleLogin,
//     logout: userAction.logout,
//     clearAlerts: alertActions.clear
// };
//
// const connectedLogin = connect(mapStateToProps, actionCreators)(Login);
// export {connectedLogin as Login};
