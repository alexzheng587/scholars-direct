import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({ component: Component, authentication, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authentication.loggedIn === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);
PrivateRoute.propTypes = {
    authentication: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    authentication: state.authentication
});
export default connect(mapStateToProps)(PrivateRoute);