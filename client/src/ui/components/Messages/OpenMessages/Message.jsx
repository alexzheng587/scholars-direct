import React from 'react';
import PropTypes from 'prop-types';
import StayScrolled from 'react-stay-scrolled';
import MessageText from './MessageText';
import '../../../styles/messages.css';

/**
 * @class Messages
 * @extends {React.PureComponent}
 */
class Message extends React.PureComponent {
    /**
     * @param {Object} props before update
     * @returns {undefined}
     */
    componentDidUpdate(props) {
        if (props.messages !== this.props.messages) {
            this.scrollBottom();
        }
    }
    storeScrolledControllers = ({ stayScrolled, scrollBottom }) => {
        this.stayScrolled = stayScrolled;
        this.scrollBottom = scrollBottom;
    };
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <div className="open-messages-container display-flex flex-column">
                <StayScrolled
                    provideControllers={this.storeScrolledControllers}
                    component="div"
                    className="open-messages"
                >
                    {this.props.messages.map((message, i) => (
                        <MessageText
                            key={message._id}
                            currentUserId={this.props.currentUserId}
                            {...message}
                            displayReadAt={Boolean(
                                message.senderId === this.props.currentUserId
                                && message.readAt
                                && i === (this.props.messages.length - 1)
                            )}
                        />
                    ))}
                </StayScrolled>
            </div>
        );
    }
}

Message.propTypes = {
    currentUserId: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape()),
};

export default Message;