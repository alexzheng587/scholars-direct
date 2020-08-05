import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CallStatuses } from "../../../constants/callStatus";
import {
    setCallStatusToAvailable,
    toggleVideoTrack,
    toggleAudioTrack,
} from '../../../actions/call';
import TrackToggle from './TrackToggle';
import '../../styles/video-chat-controller.css';
import { Button, Icon } from 'semantic-ui-react';

/**
 * @class Controller
 * @extends {React.PureComponent}
 */
class Controller extends React.PureComponent {
    /**
     * @constructor
     * @constructs Controller
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        this.state = { showHangupMessage: false };
        this.onHangupClick = this.onHangupClick.bind(this);
        this.showHangupMessage = this.showHangupMessage.bind(this);
        this.hideHangupMessage = this.hideHangupMessage.bind(this);
        this.toggleAudioTrack = this.toggleAudioTrack.bind(this);
        this.toggleVideoTrack = this.toggleVideoTrack.bind(this);
        try {
            this.hangupSound = document.getElementById('hangup');
        } catch (err) {
            this.hangupSound = null;
        }
    }
    /**
     * @returns {undefined}
     */
    onHangupClick() {
        if (this.props.status === CallStatuses.Testing) {
            return this.props.setCallStatusToAvailable();
        }
        this.hangupSound.play();
        return this.props.startHangup();
    }
    /**
     * @returns {string} message when someone hovers the hangup button
     */
    getHangupMessage() {
        switch (this.props.status) {
            case CallStatuses.Testing:
                return 'End video test';
            default:
                return 'Hang up';
        }
    }
    /**
     * @returns {undefined}
     */
    showHangupMessage() {
        this.setState({ showHangupMessage: true });
    }
    /**
     * @returns {undefined}
     */
    hideHangupMessage() {
        this.setState({ showHangupMessage: false });
    }
    /**
     * @returns {undefined}
     */
    toggleAudioTrack() {
        this.props.toggleAudioTrack();
    }
    /**
     * @returns {undefined}
     */
    toggleVideoTrack() {
        this.props.toggleVideoTrack();
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="video-chat-bottom-banner">
                <div className="display-flex track-toggle-container">
                    <TrackToggle
                        iconName="video"
                        iconNameActive="stop circle"
                        onPress={this.toggleVideoTrack}
                        trackEnabled={this.props.videoEnabled}
                        track="video"
                    />
                    <TrackToggle
                        iconName="microphone"
                        iconNameActive="microphone slash"
                        onPress={this.toggleAudioTrack}
                        trackEnabled={this.props.audioEnabled}
                        track="audio"
                    />
                </div>
                <div className="hangup-button-container">
                    <Button
                        circular icon='x' size='massive' color='grey'
                        onClick={this.onHangupClick}
                        onMouseEnter={this.showHangupMessage}
                        onMouseLeave={this.hideHangupMessage}
                    />
                    {this.state.showHangupMessage && (
                        <div className="hangup-message">
                            {this.getHangupMessage()}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Controller.propTypes = {
    status: PropTypes.shape(),
    setCallStatusToAvailable: PropTypes.func,
    startHangup: PropTypes.func,
    toggleVideoTrack: PropTypes.func,
    toggleAudioTrack: PropTypes.func,
    videoEnabled: PropTypes.bool,
    audioEnabled: PropTypes.bool,
};

const mapStateToProps = state => ({
    status: state.call.status,
    videoEnabled: state.call.videoEnabled,
    audioEnabled: state.call.audioEnabled,
});
const mapDispatchToProps = {
    setCallStatusToAvailable,
    toggleVideoTrack,
    toggleAudioTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);