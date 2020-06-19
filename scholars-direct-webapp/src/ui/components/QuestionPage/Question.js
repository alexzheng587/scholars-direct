import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Image, Button} from 'semantic-ui-react';
import {Card} from '@material-ui/core';

class Question extends React.Component {
    render() {
        return (<Item className="question-item">
            <Item.Content>
                <Item.Header as='h4'>{this.props.title}</Item.Header>
                <Item.Meta>{this.props.username}</Item.Meta>
                <Item.Meta>{this.props.time}</Item.Meta>
                <Item.Description>
                    {this.props.desc}
                </Item.Description>
                <Item.Extra>{this.props.status}</Item.Extra>
            </Item.Content>
        </Item>);
    }
}

export default Question;