import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../styles/video-chat-track-toggle.css';
import { Button } from 'semantic-ui-react';
/**
 * @class TrackToggle
 * @extends {React.PureComponent}
 */
class TrackToggle extends React.PureComponent {
    /**
     * @constructor
     * @constructs TrackToggle
     * @param {Object} props for component
     */
    constructor(props) {
        super(props);
        this.state = { instructionsVisible: false };
        this.showInstructions = this.showInstructions.bind(this);
        this.hideInstructions = this.hideInstructions.bind(this);
    }
    /**
     * @returns {undefined}
     */
    showInstructions() {
        this.setState({ instructionsVisible: true });
    }
    /**
     * @returns {undefined}
     */
    hideInstructions() {
        this.setState({ instructionsVisible: false });
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="video-chat-controller-track-toggle">
                <Button
                    circular icon={this.props.trackEnabled ? this.props.iconName : this.props.iconNameActive}
                    onClick={this.props.onPress}
                    onMouseEnter={this.showInstructions}
                    onMouseLeave={this.hideInstructions}
                />
                {this.state.instructionsVisible && (
                    <div className="explainer">
                        {this.props.trackEnabled ? 'Disable' : 'Enable'} {this.props.track}
                    </div>
                )}
            </div>
        );
    }
}

TrackToggle.propTypes = {
    iconName: PropTypes.string,
    iconNameActive: PropTypes.string,
    onPress: PropTypes.func,
    trackEnabled: PropTypes.bool,
    track: PropTypes.string,
};

export default TrackToggle;