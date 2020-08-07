import React from "react";
import "../../styles/About.css";
import "../../styles/Home.css";
import { Image, Segment } from 'semantic-ui-react';

class AboutUs extends React.Component {
    render() {
        return (
            <div className='about-container'>
                <Segment>
                    <h1 className='bold-text'>About Us</h1>
                    <p>Scholars Chat is a tutoring support webpage that aims to streamline the online tutoring process. Students
                        are allowed to ask questions on the topics and subjects they have trouble with, and tutors will be able to respond
                        and establish one-on-one instant messaging and audio/video call sessions with students to ensure their questions
                        are answered concisely and consistently.</p>
                    <Image src='https://d2zp5xs5cp8zlg.cloudfront.net/image-28381-800.jpg' size='small'/>
                </Segment>
            </div>
        );
    }
}



export default AboutUs;