import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addError, clearError } from '../../../actions/error';
import { startCall } from '../../../actions/call';
import UserInfo from './UserInfo';

import '../../styles/contact.css';

/**
 * @class Contact
 * @extends {React.PureComponent}
 */
class Contact extends React.PureComponent {
    /**
     * @constructor
     * @constructs Contact
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        // this.openTextChat = this.openTextChat.bind(this);
        this.callContact = this.callContact.bind(this);
    }
    /**
     * @returns {undefined}
     */
    callContact() {
        this.props.startCall(this.props.id, this.props.user.socketId);
    }
    /**
     * @returns {Promise<undefined>} opens existing message thread between users or creates one
     */
    // async openTextChat() {
    //     this.props.clearError();
    //     const messageThread = this.props.messageThreads.data &&
    //         this.props.messageThreads.data.find(({ user }) => user.id === this.props.user.id);
    //     if (messageThread) return this.props.history.push(GET_MESSAGE_THREAD_ROUTE(messageThread.id));
    //     const mutation = await this.props.createMessageThread({
    //         variables: { contactId: this.props.id },
    //         refetchQueries: [{ query: QUERY_MESSAGE_THREADS }],
    //     });
    //     const { data: { result } } = mutation;
    //     if (!result.success) this.props.addError(result.message);
    //     return this.props.history.push(GET_MESSAGE_THREAD_ROUTE(result.threadId));
    // }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="contact-container display-flex">
                <UserInfo {...this.props.user} />
                <div className="controls display-flex align-items-center">
                    {this.props.user.status === 'available' && (
                        <button onClick={this.callContact}>
                            <i className="fa fa-video-camera" />
                        </button>
                    )}
                    {/*<button onClick={this.openTextChat}>*/}
                    {/*    <i className="fa fa-comments" />*/}
                    {/*</button>*/}
                </div>
            </div>
        );
    }
}

Contact.propTypes = {
    id: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.string,
        socketId: PropTypes.string,
    }),
    history: PropTypes.shape(),
    addError: PropTypes.func,
    clearError: PropTypes.func,
    startCall: PropTypes.func,
};

export default compose(
    connect(null, { addError, clearError, startCall }),
)(Contact);