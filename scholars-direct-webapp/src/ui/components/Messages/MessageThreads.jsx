import React from 'react';
import { shape, arrayOf, func, number } from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import {QUERY_MESSAGE_THREADS} from '../../../graphql/queries/message-threads/message-threads';
import {QUERY_USER_ID} from '../../../graphql/queries/user/id';
import Loader from '../Loader';
import Headroom from '../../components/Messages/MessageThreadList/Headroom';
import MessageThreads from '../../components/Messages/MessageThreadList/MessageThreads';

/**
 * @class ThreadList
 * @extends {React.PureComponent}
 */
class MessageThreads extends React.PureComponent {
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        this.props.messageThreads.refetch();
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        if (!this.props.messageThreads.data) {
            return (
                <div className="full-height flex-center">
                    <Headroom />
                    <Loader />
                </div>
            );
        }
        return (
            <div className="full-height flex-column">
                <Headroom />
                <MessageThreads
                    currentUserId={this.props.currentSession.user.id}
                    threads={this.props.messageThreads.data.filter(thread => thread.latestMessage)}
                />
            </div>
        );
    }
}

MessageThreadList.propTypes = {
    messageThreads: shape({
        data: arrayOf(shape()),
        refetch: func,
    }),
    currentSession: shape({
        user: shape({ id: number }),
    }),
};

export default compose(
    graphql(
        QUERY_MESSAGE_THREADS,
        { name: 'messageThreads' },
    ),
    graphql(
        QUERY_USER_ID,
        { name: 'currentSession' },
    ),
)(MessageThreadList);
