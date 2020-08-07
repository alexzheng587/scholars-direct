import React from "react";
import {Image} from 'semantic-ui-react';
import "../../styles/Home.css"

class Home extends React.Component {

    render() {
        return (
            <div className='home-container'>
                <h2 className="bold-text">Welcome to Scholars Chat!</h2>
                <h5>Find the Answers to your Questions...</h5>
                <Image src='https://expresswriters.com/wp-content/uploads/2013/10/header-2-1210x423.jpg' size="massive" fluid centered />
            </div>
        );
    }
}



export default Home;