import React from "react";
import {Image} from 'semantic-ui-react';
import "../../styles/Home.css"

class Home extends React.Component {

    render() {
        return (

            <div className='home-container'>
                <h2>Welcome to the homepage!</h2>
                <Image src='https://cdn5.f-cdn.com/contestentries/1383554/9392852/5b6160ea58628_thumb900.jpg' size='huge' fluid centered />
            </div>
        );
    }
}



export default Home;