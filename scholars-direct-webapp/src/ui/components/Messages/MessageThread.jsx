import React from 'react';
import { shape, number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import UserInfo from '../Contact/UserInfo';
import '../../styles/message-thread.css';

/**
 * @class MessageThread
 * @extends {React.PureComponent}
 */
class MessageThread extends React.PureComponent {
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <Link
                className="message-thread-link"
                to={'/videoChat/messages/thread/'+ this.props.id}
            >
                <div
                    className={classNames(
                        'message-thread',
                        'display-flex',
                        'align-items-center',
                        (
                            this.props.latestMessage.senderId !== this.props.currentUserId
                            && !this.props.latestMessage.readAt
                            && 'unread-message'
                        )
                    )}
                >
                    <UserInfo
                        {...this.props.user}
                        message={this.props.latestMessage.shortenedBody}
                    />
                    <div className="formatted-date">
                        {this.props.latestMessage.createdAt}
                    </div>
                </div>
            </Link>
        );
    }
}

MessageThread.propTypes = {
    id: string,
    user: shape(),
    shortenedBody: string,
    latestMessage: shape({
        shortenedBody: string,
        senderId: string,
        readAt: string,
    }),
    currentUserId: string,
};

export default MessageThread;
