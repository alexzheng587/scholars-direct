import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Image, Button} from 'semantic-ui-react';
import {Card} from '@material-ui/core';
import { connect } from 'react-redux';
import {deleteQuestion} from "../../../actions";

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
                <Item.Extra>
                    {this.props.status}
                    <Button circular icon='delete' floated='right' onClick={() => this.props.deleteQuestion(this.props.id)}/>
                </Item.Extra>
            </Item.Content>
        </Item>);
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
    }
};

export default connect(mapStateToProps, {deleteQuestion})(Question);