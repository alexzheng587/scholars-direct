import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { CALLING_CONTACT_QUERY } from '../../../graphql/queries/contacts/calling-contact';
import { CallStatuses } from "../../../constants/callStatus";
import {
    cancelCall,
    setCallStatusToAvailable,
    clearCallingContactId,
    clearCallingSocketId,
} from '../../../actions/call';
import Loader from '../Loader';

import '../../styles/video-chat-calling.css';

/**
 * @class Calling
 * @extends {React.PureComponent}
 */
class Calling extends React.PureComponent {
    /**
     * @constructor
     * @constructs Calling
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        this.cancelCall = this.cancelCall.bind(this);
        try {
            this.hangupSound = document.getElementById('hangup');
            this.ringTone = document.getElementById('calling-ringtone');
        } catch (err) {
            this.hangupSound = null;
            this.ringTone = null;
        }
    }
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        if (this.ringTone) {
            console.log(this.props.callingContact);
            this.ringTone.play();
            this.ring = setInterval(() => this.ringTone.play(), 2e3);
        }
    }
    /**
     * @param {Object} props component will receive
     * @returns {undefined}
     */
    UNSAFE_componentWillReceiveProps(props) {
        if (props.status === CallStatuses.CallFailed) {
            if (this.ring) clearInterval(this.ring);
            if (this.hangupSound) this.hangupSound.play();
            this.callFailedTimer = setTimeout(() => {
                if (props.status !== CallStatuses.CallFailed) return;
                this.callFailedTimer = null;
                this.props.setCallStatusToAvailable();
                this.props.clearCallingContactId();
                this.props.clearCallingSocketId();
            }, 1e4);
        } else if (this.callFailedTimer) {
            clearTimeout(this.callFailedTimer);
            this.callFailedTimer = null;
        }
    }
    /**
     * @returns {undefined}
     */
    componentWillUnmount() {
        if (this.callFailedTimer) {
            clearTimeout(this.callFailedTimer);
            this.callFailedTimer = null;
        }
        if (this.ring) clearInterval(this.ring);
    }
    /**
     * @returns {undefined}
     */
    cancelCall() {
        this.props.cancelCall();
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="full-width full-height flex-center flex-column video-chat-calling">
                {this.props.callingContact.loading ? (
                    <Loader />
                ) : (
                    <div className="calling-contact flex-column align-items-center">
                        <img
                            alt={this.props.callingContact.data.user.username}
                        />
                        <div className="call-message">
                            {this.props.status === CallStatuses.Calling ?
                                `Calling ${this.props.callingContact.data.user.username}...`
                                : `Unable to reach ${this.props.callingContact.data.user.username}.`
                            }
                        </div>
                        {this.props.status === CallStatuses.Calling && (
                            <Button
                                onClick={this.cancelCall}
                            >
                                CANCEL
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

Calling.propTypes = {
    status: PropTypes.shape(),
    cancelCall: PropTypes.func,
    setCallStatusToAvailable: PropTypes.func,
    clearCallingContactId: PropTypes.func,
    clearCallingSocketId: PropTypes.func,
    callingContact: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.shape({
            user: PropTypes.shape({
                username: PropTypes.string,
            }),
        }),
    }),
};

export default compose(
    connect(
        state => ({
            callingContactId: state.call.callingContactId,
            status: state.call.status,
        }),
        {
            cancelCall,
            setCallStatusToAvailable,
            clearCallingContactId,
            clearCallingSocketId,
        },
    ),
    graphql(
        CALLING_CONTACT_QUERY,
        {
            name: 'callingContact',
            options: props => ({
                variables: { contactId: props.callingContactId },
            }),
        },
    ),
)(Calling);