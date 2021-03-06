import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { CALLING_CONTACT_QUERY } from '../../../graphql/queries/contacts/calling-contact';
import { CallStatuses } from "../../../constants/callStatus";
import {
  ignoreCall,
  setCallStatusToAcceptingCall,
} from '../../../actions/call';
import Loader from '../Loader';

import '../../styles/video-chat-receiving-call.css';

/**
 * @class ReceivingCall
 * @extends {React.PureComponent}
 */
class ReceivingCall extends React.PureComponent {
  /**
   * @constructor
   * @constructs ReceivingCall
   * @param {Object} props for component
   */
  constructor(props) {
    super(props);
    this.acceptCall = this.acceptCall.bind(this);
    this.ignoreCall = this.ignoreCall.bind(this);
    try {
      this.ringTone = document.getElementById('call-ringtone');
    } catch (err) {
      this.ringTone = null;
    }
  }
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    console.log("receiving call mounted");
    if (this.ringTone) {
      this.ringTone.play();
      this.ring = setInterval(() => this.ringTone.play(), 2e3);
    }
    this.ignoreTimer = setTimeout(() => {
      if (this.props.status !== CallStatuses.ReceivingCall) return;
      this.ignoreTimer = null;
      this.props.ignoreCall();
    }, 25e3);
  }
  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.ignoreTimer) {
      clearTimeout(this.ignoreTimer);
      this.ignoreTimer = null;
    }
    if (this.ring) clearInterval(this.ring);
  }
  /**
   * @returns {undefined}
   */
  async acceptCall() {
    this.props.setCallStatusToAcceptingCall();
  }
  /**
   * @returns {undefined}
   */
  ignoreCall() {
    this.props.ignoreCall();
  }
  /**
   * render
   * @returns {JSX.Element} HTML
   */
  render() {
    return (
      <div
        className={classNames(
          'full-width',
          'full-height',
          'flex-center',
          'flex-column',
          'video-chat-receiving-call'
        )}
      >
        {this.props.callingContact.loading ? (
          <Loader />
        ) : (
          <div className="calling-contact flex-column align-items-center">
            {/*<img*/}
            {/*  alt={this.props.callingContact.data.user.username}*/}
            {/*  src={this.props.callingContact.data.user.pictureUrl}*/}
            {/*/>*/}
            <div className="call-message">
              {this.props.callingContact.data.user.username} wants to chat!
            </div>
            <div className="display-flex justify-content-center">
              <Button
                circular
                onClick={this.acceptCall}
              >
                Accept
              </Button>
              <Button
                  circular
                onClick={this.ignoreCall}
              >
                Ignore
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReceivingCall.propTypes = {
  status: PropTypes.shape(),
  ignoreCall: PropTypes.func,
  setCallStatusToAcceptingCall: PropTypes.func,
  callingContact: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string,
        pictureUrl: PropTypes.string,
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
      ignoreCall,
      setCallStatusToAcceptingCall,
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
)(ReceivingCall);