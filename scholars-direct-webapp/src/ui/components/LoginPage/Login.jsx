import React from "react";
import '../../styles/Form.css';
import { userAction } from '../../../actions/userAction';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { alertActions } from '../../../actions/alertLogin';
import { history } from '../../../helpers/history';
import PropTypes from 'prop-types';
import { graphql, withApollo } from '@apollo/react-hoc';
import { addError, clearError } from '../../../actions/error';
import { setToken } from '../../../actions/authtoken'
import { QUERY_USER_ID } from '../../../graphql/queries/user/id';
import { LOGIN_MUTATION } from '../../../graphql/mutations/user/login';
import { compose } from 'redux';

class Login extends React.Component {


    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
        // reset login status
        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    async handleSubmit(e) {
        try {
            e.preventDefault();
            const {data} = await this.props.loginUser({
                variables: {email: this.state.email.trim(), password: this.state.password},
            });
            if (!data.result) return this.handleError();
            const { success, message, token } = data.result;
            this.setState({submitted: true});
            const {username, password} = this.state;
            if (username && password) {
            }
        } catch (err) {
            console.log(err);
            return this.handleError();
        }
    }

    async handleError(error = 'Something went wrong logging you in') {
        await new Promise(resolve => this.setState({ loading: false }, resolve));
        return this.props.addError(error);
    }

    render() {
        const {alert} = this.props;
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
    loginUser: PropTypes.func,
    addError: PropTypes.func,
    clearError: PropTypes.func,
    setToken: PropTypes.func,
};

const connectedLogin = compose(
    withApollo,
    connect(null, { addError, clearError, setToken }),
    graphql(LOGIN_MUTATION, { name: 'loginUser' }),
    graphql(QUERY_USER_ID),
)(Login);

export { connectedLogin as Login }

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