import React from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';
import { graphql } from '@apollo/client/react/hoc';
import {READ_MESSAGE_MUTATION} from '../../../../graphql/mutations/messages/read-message';
import '../../../styles/message-text.css';

/**
 * @class Message
 * @extends {React.PureComponent}
 */
class MessageText extends React.PureComponent {
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        if (!this.props.readAt) {
            this.props.readMessage({
                variables: { messageId: this.props._id },
            });
        }
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        const ReadAt = this.props.readAt && this.props.displayReadAt ? (
            <div className="read-at-message">
                Read {this.props.readAt}
            </div>
        ) : null;

        return (
            <div
                className={classNames(
                    'open-message-wrapper flex-column',
                    this.props.currentUserId === this.props.senderId && 'sent-by-current-user'
                )}
            >
                <div className="message">
                    {this.props.body}
                </div>
                {ReadAt}
            </div>
        );
    }
}

MessageText.propTypes = {
    _id: string,
    currentUserId: string,
    senderId: string,
    body: string,
    readAt: string,
    readMessage: func,
    displayReadAt: bool,
};

export default graphql(READ_MESSAGE_MUTATION, { name: 'readMessage' })(MessageText);
