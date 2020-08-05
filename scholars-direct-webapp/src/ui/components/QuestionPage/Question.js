import React from "react";
import { connect } from 'react-redux';
import {
    deleteQuestionFailure,
    deleteQuestionRequested,
    deleteQuestionSuccess
} from "../../../actions/questionAction";
import {addFilterTag} from "../../../actions/filterTagAction";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Label, Button, Icon} from 'semantic-ui-react';
import OfferDialog from "./OfferDialog";
import {compose} from "redux";
import {graphql, withApollo} from "@apollo/client/react/hoc";
import {DELETE_QUESTION_MUTATION} from "../../../graphql/mutations/question/delete-question";
import PropTypes from "prop-types";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    }

    async handleDeleteQuestion(state) {
        try {
            this.props.deleteQuestionRequested();
            const { data } = await this.props.deleteQuestion({
                variables: {questionId: state.id}
            });
            if (!data.result) {
                return this.props.deleteQuestionFailure();
            }
            this.props.deleteQuestionSuccess(state.key);
        } catch(e) {
            this.props.deleteQuestionFailure(e);
        }
    }

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
                        <Label as='a' color='teal' onClick={() => {
                            if (!this.props.filterTags.includes(tag) &&
                                this.props.filterTags.length < 5) this.props.addFilterTag(tag)}}>
                            {tag}
                        </Label>)}
                    </div>
                    <div>
                    <Button circular icon='delete' floated='right' onClick={async () => {this.handleDeleteQuestion({
                        id: this.props.id,
                        key: this.props.msgKey
                    }); }}/>
                    <OfferDialog userId={this.props.userId} />
                    </div>
                </Item.Extra>

            </Item.Content>
        </Item>);
    }
}

Question.propTypes = {
    questions: PropTypes.object.isRequired,
    isQuestionsLoading: PropTypes.bool,
    questionError: PropTypes.object,
    filterTags: PropTypes.arrayOf(PropTypes.string),
    deleteQuestion: PropTypes.func,
    deleteQuestionSuccess: PropTypes.func,
    deleteQuestionFailure: PropTypes.func,
    deleteQuestionRequested: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError,
        filterTags: state.filterTags
    }
};

export default compose(
    withApollo,
    connect(mapStateToProps, {addFilterTag, deleteQuestionSuccess, deleteQuestionRequested, deleteQuestionFailure}),
    graphql(DELETE_QUESTION_MUTATION, { name: 'deleteQuestion' }),
)(Question);