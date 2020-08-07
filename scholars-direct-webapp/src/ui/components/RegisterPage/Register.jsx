import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userAction} from '../../../actions/userAction';
import '../../styles/Form.css';
import PropTypes from "prop-types";
import { compose } from 'redux';
import { graphql } from '@apollo/client/react/hoc';
import { setToken } from '../../../actions/authtoken';
import { REGISTER_MUTATION } from '../../../graphql/mutations/user/register';
import { addError, clearError } from '../../../actions/error';
import { login } from '../../../actions/userAction';
import { history } from '../../../helpers/history';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                password2: ""
            },
            errors: {},
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    async handleSubmit(event) {
        try {
            event.preventDefault();
            //this.setState({submitted: true});
            const {user} = this.state;
            if (user.name && user.email && user.password && user.password2) {
                console.log(user.email);
                const {data} = await this.props.registerUser({
                    variables: {
                        email: user.email.trim(),
                        username: user.name,
                        password: user.password
                    },
                });
                console.log(data);
                if (!data.result) return this.handleError();
                const { success, message, token } = data.result;
                if (!success) return this.handleError(message);
                this.setState({submitted: true});
                history.push('/login');
            }
        } catch (err) {
            console.log(err);
            return this.handleError();
        }
    }

    async handleError(error = 'Something went wrong signing you up') {
        this.setState({ submitted: false });
        return this.props.addError(error);
    }

    render() {
        const {registering} = this.props;
        const {user, submitted, errors} = this.state;
        return (
            <div className="container">
                <div className="login-form">
                    <h1>Register</h1>
                    <br></br>
                <form onSubmit={this.handleSubmit}>


                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input type="text"
                               name="name"
                               value={user.name}
                               onChange={this.handleChange}
                               required
                        />
                        {errors.errors && errors.errors.name &&
                        <div className="invalid">
                            {errors.errors.name}
                        </div>
                        }
                    </div>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                               name="password"
                               value={user.password}
                               onChange={this.handleChange}
                               required
                        />
                        {errors.errors && errors.errors.password &&
                        <div className="invalid">
                            {errors.errors.password}
                        </div>
                        }
                    </div>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password:</label>
                        <input type="password"
                               name="password2"
                               value={user.password2}
                               onChange={this.handleChange}
                               required
                        />
                        {errors.errors && errors.errors.password2 &&
                        <div className="invalid">
                            {errors.errors.password2}
                        </div>
                        }
                    </div>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                               name="email"
                               value={user.email}
                               onChange={this.handleChange}
                               error={errors.email}
                               required
                        />
                        {errors.errors && errors.errors.email &&
                        <div className="invalid">
                            {errors.errors.email}
                        </div>
                        }

                    </div>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerUser: PropTypes.func,
    addError: PropTypes.func,
    clearError: PropTypes.func,
    setToken: PropTypes.func,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    errors: state.errors,
});


const actionCreators = {
    register: userAction.register,
    addError: addError,
    clearError: clearError,
    login: login,
    setToken: setToken
};

const connectedRegisterPage = compose(
    connect(mapStateToProps, actionCreators),
    graphql(REGISTER_MUTATION, { name: 'registerUser' }),
)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
