import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Route, withRouter} from 'react-router-dom';

import {QUERY_USER_ID} from '../../../graphql/queries/user/id';
import { QUERY_CONTACTS } from '../../../graphql/queries/contacts/contacts';
import {QUERY_MESSAGE_THREADS} from "../../../graphql/queries/message-threads/message-threads";
import {USER_STATUS_CHANGE_SUBSCRIPTION} from '../../../graphql/subscriptions/users/user-status-change';
// import {USER_UPDATE_SUBSCRIPTION} from '../../../graphql/subscriptions/users/update';
import {MESSAGE_CREATED_SUBSCRIPTION} from '../../../graphql/subscriptions/messages/message-created';
import { history } from '../../../helpers/history';

import ContactList from "../Contact/ContactList";
import Messages from "../Messages/Messages";

import { handleHangUp } from '../../../actions/call';
import VideoChat from '../VideoChat/VideoChat';
import isLoggedIn from '../../../helpers/is-logged-in';
import cloneDeep from 'lodash.clonedeep';

import '../../styles/layout.css';

/**
 * @class PageLayout
 * @extends {React.PureComponent}
 */
class PageLayout extends React.PureComponent {
    /**
     * @constructor
     * @constructs PageLayout
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        try {
            this.messageSound = document.getElementById('message-sound');
            this.contactSound = document.getElementById('contact-sound');
        } catch (err) {
            this.messageSound = null;
            this.contactSound = null;
        }
    }
    /**
     * @returns {undefined}
     */
    async componentDidMount() {
        // this.subscribeToNewContactRequests();
        // this.subscribeToAcceptedContactRequests();
        this.subscribeToStatusChanges();
        this.subscribeToNewMessages();
        this.subscribeToUserUpdates();
    }
    /**
     * @param {Object} props before update
     * @returns {undefined}
     */
    componentDidUpdate(props) {
        // this.subscribeToNewContactRequests();
        // this.subscribeToAcceptedContactRequests();
        this.subscribeToStatusChanges();
        this.subscribeToNewMessages();
        this.subscribeToUserUpdates();
    }
    /**
     * @returns {undefined}
     */
    // subscribeToNewContactRequests() {
    //     if (this.newContacts) this.newContacts();
    //     this.newContacts = this.props.pendingRequests.subscribeToMore({
    //         document: SUBSCRIBE_TO_CONTACT_REQUEST_RECEIVED,
    //         variables: {
    //             userId: this.props.currentSession.user && this.props.currentSession.user.id,
    //         },
    //         updateQuery: (prev, { subscriptionData: { data } }) => {
    //             if (!data || !data.requestReceived) return prev;
    //             if (this.contactSound) {
    //                 this.contactSound.play();
    //             }
    //             this.props.addNotice(`${data.requestReceived.sender.username} sent you a contact request!`);
    //             return {
    //                 ...prev,
    //                 data: [
    //                     data.requestReceived,
    //                     ...prev.data,
    //                 ],
    //             };
    //         },
    //     });
    // }
    // /**
    //  * @returns {undefined}
    //  */
    // subscribeToAcceptedContactRequests() {
    //     if (this.newContactRequests) this.newContactRequests();
    //     this.newContactRequests = this.props.contacts.subscribeToMore({
    //         document: SUBSCRIBE_TO_CONTACT_REQUEST_ACCEPTED,
    //         variables: {
    //             userId: this.props.currentSession.user && this.props.currentSession.user.id,
    //         },
    //         updateQuery: (prev, { subscriptionData: { data } }) => {
    //             if (!data || !data.newContact) return prev;
    //             if (this.contactSound) {
    //                 this.contactSound.play();
    //             }
    //             this.props.addNotice(`${data.newContact.user.username} accepted your contact request!`);
    //             return {
    //                 ...prev,
    //                 data: [
    //                     data.newContact,
    //                     ...prev.data,
    //                 ],
    //             };
    //         },
    //     });
    // }
    // /**
    //  * @returns {undefined}
    //  */
    subscribeToStatusChanges() {
        if (this.statusChanges) this.statusChanges();
        this.statusChanges = this.props.contacts.subscribeToMore({
            document: USER_STATUS_CHANGE_SUBSCRIPTION,
            variables: {
                userIds: this.props.contacts.data ? this.props.contacts.data.map(contact => contact.user._id) : [],
            },
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data || !data.user) return prev;
                const newData = cloneDeep(prev.data).map((contact) => {
                    if (data.user._id === contact.user._id) {
                        if (
                            contact.id === this.props.callingContactId
                            && data.user.status === 'offline'
                        ) this.props.handleHangUp();
                        return { ...contact, user: data.user };
                    }
                    return contact;
                });
                return {
                    ...prev,
                    data: newData,
                };
            },
            onError: err => console.log(err)
        });
    }
    /**
     * @returns {undefined}
     */
    subscribeToUserUpdates() {
        if (this.userUpdates) this.userUpdates();
        this.userUpdates = this.props.contacts.subscribeToMore({
             // document: USER_UPDATE_SUBSCRIPTION,
            variables: {
                userIds: this.props.contacts.data ? this.props.contacts.data.map(contact => contact.user.id) : [],
            },
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data || !data.user) return prev;
                const newData = cloneDeep(prev.data).map((contact) => {
                    if (data.user.id === contact.user.id) {
                        if (
                            contact.id === this.props.callingContactId
                            && data.user.status === 'offline'
                        ) this.props.handleHangUp();
                        return { ...contact, user: { ...contact.user, ...data.user } };
                    }
                    return contact;
                });
                return {
                    ...prev,
                    data: newData,
                };
            },
        });
    }
    /**
     * @returns {undefined}
     */
    subscribeToNewMessages() {
        if (this.newMessages) this.newMessages();
        console.log(this.props.currentSessionId);
        this.newMessages = this.props.messageThreads.subscribeToMore({
            document: MESSAGE_CREATED_SUBSCRIPTION,
            variables: {
                forUserId: this.props.currentSessionId,
            },
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data || !data.messageCreated) return prev;
                if (!prev.data.find(thread => thread.id === data.messageCreated.threadId)) {
                    this.props.messageThreads.refetch();
                    return prev;
                }
                if (data.messageCreated.senderId !== this.props.currentSession.user.id) {
                    //this.messageSound.play();
                }
                return {
                    ...prev,
                    data: prev.data.map((thread) => {
                        if (data.messageCreated.threadId !== thread.id) return thread;
                        return {
                            ...thread,
                            latestMessage: data.messageCreated,
                        };
                    }),
                };
            },
        });
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
                <div className="app-content display-flex">
                    {!isLoggedIn(this.props.currentSession.user) &&
                    <VideoChat />}
                    <Route exact path={`/videoChat/contacts`} component={ContactList} />
                    <Route path={`/videoChat/messages`} component={Messages} />
                </div>
        );
    }
}

PageLayout.contextTypes = {
    router: PropTypes.shape(),
};

PageLayout.propTypes = {
    route: PropTypes.shape(),
    currentSession: PropTypes.shape({
        user: PropTypes.shape({ id: PropTypes.string }),
        refetch: PropTypes.func,
    }),
    contacts: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape()),
        subscribeToMore: PropTypes.func,
        refetch: PropTypes.func,
    }),
    messageThreads: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape()),
        subscribeToMore: PropTypes.func,
        refetch: PropTypes.func,
    }),
    addNotice: PropTypes.func,
    callingContactId: PropTypes.string,
    handleHangUp: PropTypes.func,
};
const mapStateToProps = (state) => { //name is by convention
    return {
        auth: state.authentication,
        callingContactId: state.call.callingContactId,
        currentSessionId: state.authentication.userId
    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { handleHangUp },
    ),
    graphql(
        QUERY_USER_ID,
        { name: 'currentSession' },
    ),
    graphql(
        QUERY_CONTACTS,
        { name: 'contacts' },
    ),
    graphql(
        QUERY_MESSAGE_THREADS,
        { name: 'messageThreads' },
    ),
)(PageLayout);