import React from 'react';
import Sidebar from '../TutorLayout/Sidebar';
import {Route} from 'react-router-dom';
import OpenMessage from "./OpenMessages/OpenMessage";
import MessageThreadList from "./MessageThreadList";

/**
 * @class Messages
 * @extends {React.PureComponent}
 */
class Messages extends React.PureComponent {
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <Sidebar>
                <Route exact path={`/videoChat/messages`} component={MessageThreadList} />
                <Route path={`/videoChat/messages/thread/:threadid`} component={OpenMessage} />
            </Sidebar>
        );
    }
}

Messages.propTypes = {};

export default Messages;