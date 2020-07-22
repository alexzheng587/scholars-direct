import React from "react";
import { connect } from 'react-redux';
import {deleteQuestion} from "../../../actions/questionAction";

import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Label, Button, Icon} from 'semantic-ui-react';

import OfferDialog from "./OfferDialog";

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
                    <div>{this.props.status}</div>
                    <div>{this.props.tags.map((tag) =>
                        <Label as='a' color='teal'>
                            {tag}
                        </Label>)}
                    </div>
                    <div>
                    <Button circular icon='delete' floated='right' onClick={() => this.props.deleteQuestion({
                        id: this.props.id,
                        key: this.props.msgKey
                    })}/>
                    <OfferDialog/>
                    </div>

                </Item.Extra>
            </Item.Content>
        </Item>);
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError
    }
};

export default connect(mapStateToProps, {deleteQuestion})(Question);