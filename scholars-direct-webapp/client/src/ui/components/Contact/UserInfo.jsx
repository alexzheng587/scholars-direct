import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import '../../styles/user-info.css';

/**
 * @class UserInfo
 * @extends {React.PureComponent}
 */
class UserInfo extends React.PureComponent {
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="display-flex align-items-center">
                <div className="flex-column">
                    {Boolean(this.props.status) && (
                        <div className={classNames('status-indicator', this.props.status)} />
                    )}
          <span className="username">
            {this.props.username}
          </span>
                    <span className="grey-text">
            {this.props.email || this.props.message}
          </span>
                </div>
            </div>
        );
    }
}

UserInfo.propTypes = {
    email: string,
    username: string,
    status: string,
    message: string,
};

export default UserInfo;
