import React from 'react';

class ConferenceRoom extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="video-window">
                    <video playsinline autoPlay id="self-video"></video>
                </div>
                <section className="select">
                    <label htmlFor="audioSource">Audio source: </label>
                    <select id="audioSource"></select>
                </section>
                <section className="select">
                    <label htmlFor="videoSource">Video source: </label>
                    <select id="videoSource"></select>
                </section>
                <div id="scholars-chat">
                    <h2>Scholars Chat</h2>
                    <div id="chat-window">
                        <div id="output"></div>
                        <div id="feedback"></div>
                    </div>
                    <input id="handle" type="text" placeholder="Handle"/>
                    <input id="message" type="text" placeholder="Message"/>
                    <button id="send">Send</button>
                </div>
            </div>
        )
    }
}