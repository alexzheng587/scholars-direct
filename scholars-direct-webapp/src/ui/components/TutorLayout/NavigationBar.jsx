import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';
import NavigationLink from './NavigationLink';
import {QUERY_MESSAGE_THREADS} from '../../../graphql/queries/message-threads/message-threads';
import {QUERY_USER_ID} from '../../../graphql/queries/user/id';
//import '../../styles/navbar.scss';

/**
 * @class Navbar
 * @extends {React.PureComponent}
 */
class NavigationBar extends React.PureComponent {
    /**
     * @constructor
     * @constructs Navbar
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        this.state = {
            linkProps: [
                {
                    to: '/videoChat/contacts',
                    icon: 'address-book-o',
                },
                {
                    to: '/videoChat/messages',
                    icon: 'comments-o',
                    dataKey: 'messageThreads',
                    notifs: null,
                    filter: thread => (
                        thread.latestMessage.senderId !== this.props.currentSession.user._id
                        && !thread.latestMessage.readAt
                    ),
                },
            ],
        };
    }
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        this.setNotificationCounts();
    }
    /**
     * @param {Object} props sent to component
     * @returns {undefined}
     */
    componentDidUpdate(props) {
        if (props !== this.props)
            this.setNotificationCounts();
    }
    /**
     * @returns {undefined}
     */
    setNotificationCounts() {
        this.setState({
            linkProps: this.state.linkProps.map(({ dataKey, filter, ...linkProps }) => {
                let notifs =
                    this.props[dataKey]
                    && this.props[dataKey].data
                    && this.props[dataKey].data.filter(filter).length;
                notifs = (notifs >= 99 && '99+') || (notifs && String(+notifs)) || '';
                return {
                    ...linkProps,
                    filter,
                    dataKey,
                    notifs,
                };
            }),
        });
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="navbar display-flex">
                {this.state.linkProps.map(props => (
                    <NavigationLink key={props.to} {...props} />
                ))}
            </div>
        );
    }
}

NavigationBar.propTypes = {
    currentSession: PropTypes.shape({
        user: PropTypes.shape({ _id: PropTypes.string }),
    }),
    addNotice: PropTypes.func,
};

export default compose(
    graphql(
        QUERY_USER_ID,
        { name: 'currentSession' },
    ),
    graphql(
        QUERY_MESSAGE_THREADS,
        { name: 'messageThreads' },
    ),
)(NavigationBar);
