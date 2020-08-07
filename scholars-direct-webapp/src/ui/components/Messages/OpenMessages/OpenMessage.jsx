import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';

import {QUERY_OPEN_MESSAGE_THREAD} from '../../../../graphql/queries/message-threads/open-message-thread';
import {QUERY_USER_ID} from '../../../../graphql/queries/user/id';
import {MESSAGE_CREATED_SUBSCRIPTION} from '../../../../graphql/subscriptions/messages/message-created';
import {MESSAGE_READ_SUBSCRIPTION} from '../../../../graphql/subscriptions/messages/message-read';

import Loader from '../../Loader';
import Message from './Message';
import MessageInput from './MessageInput';

/**
 * @class OpenMessageThread
 * @extends {React.PureComponent}
 */
class OpenMessageThread extends React.PureComponent {
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        console.log(this.props.currentSession.user._id);
        this.props.openMessageThread.subscribeToMore({
            document: MESSAGE_CREATED_SUBSCRIPTION,
            variables: {
                forUserId: this.props.currentSession.user._id,
            },
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data || !data.messageCreated) return prev;
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        messages: [...prev.data.messages, data.messageCreated],
                    },
                };
            },
        });

        this.props.openMessageThread.subscribeToMore({
            document: MESSAGE_READ_SUBSCRIPTION,
            variables: {
                forThreadId: this.props.match.params.threadid,
            },
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data || !data.messageRead) return prev;
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        messages: prev.data.messages.map(message => (
                            message.id === data.messageRead.id ?
                                ({ ...message, readAt: data.messageRead.readAt })
                                : message
                        )),
                    },
                };
            },
        });
    }
    /**
     * @returns {undefined}
     */
    componentDidUpdate() {
        if (!this.props.openMessageThread.loading && !this.props.openMessageThread.data) {
            this.props.history.push("/videoChat/messages");
        }
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        if (!this.props.openMessageThread.data) {
            return (
                <div className="full-height flex-center">
                    <Loader />
                </div>
            );
        }
        return (
            <div className="full-height flex-column">
                { console.log(this.props.openMessageThread.data) }
                <Message
                    currentUserId={this.props.currentSession.user._id}
                    messages={this.props.openMessageThread.data.messages}
                />
                <MessageInput
                    user={this.props.openMessageThread.data.user}
                    messages={this.props.openMessageThread.data.messages}
                    threadId={this.props.openMessageThread.data.id}
                />
            </div>
        );
    }
}

OpenMessageThread.propTypes = {
    history: PropTypes.shape(),
    match: PropTypes.shape(),
    currentSession: PropTypes.shape({
        user: PropTypes.shape({ id: PropTypes.string }),
    }),
    openMessageThread: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.shape({
            id: PropTypes.string,
            user: PropTypes.shape(),
            messages: PropTypes.arrayOf(PropTypes.shape()),
        }),
        subscribeToMore: PropTypes.func,
    }),
};

export default compose(
    graphql(
        QUERY_USER_ID,
        { name: 'currentSession' },
    ),
    graphql(
        QUERY_OPEN_MESSAGE_THREAD,
        {
            name: 'openMessageThread',
            options: props => ({
                variables: { threadId: props.match.params.threadid },
            }),
        },
    ),
)(OpenMessageThread);
