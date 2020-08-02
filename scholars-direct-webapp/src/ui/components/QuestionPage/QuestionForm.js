import React from "react";
import '../../styles/Form.css';
import { connect } from 'react-redux';
import {
    addQuestionRequested,
    addQuestionFailure,
    addQuestionSuccess
} from "../../../actions/questionAction";
import {Icon, Label} from 'semantic-ui-react';
import {compose} from "redux";
import {graphql, withApollo} from "@apollo/client/react/hoc";
import PropTypes from "prop-types";
import {ADD_QUESTION_MUTATION} from "../../../graphql/mutations/question/add-question";

let initialState = {
    title: "",
    username: "",
    description: "",
    time: "",
    status: "open",
    tags: []
};

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
    }

    async handleSubmit(e) {
        if (e.key === 'Enter') {
            return;
        }
        e.preventDefault();
        const s = this.state.title.trim();
        const u = this.state.username.trim();
        const d = this.state.description.trim();
        const t = this.state.tags;

        if (s && u && d && d.length > 140 && t.length > 0) {
            //this.props.addQuestion(this.state);
            await this.handleAddQuestion(this.state);
            this.setState(initialState);
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleAddTag(e) {
        if (e.key === 'Enter' && e.target.value.trim() && this.state.tags.length < 5) {
            this.setState({
                tags: [...this.state.tags, e.target.value]
            });
            this.tagInput.value = null;
        }
    }

    removeTag(i) {
        let newTags = this.state.tags.slice(0);
        newTags.splice(i, 1);
        this.setState({
            tags: newTags
        })
    }

    async handleAddQuestion(state) {
        try {
            this.props.addQuestionRequested();
            const { data } = await this.props.addQuestion({
                variables: state
            });
            if (!data.result) {
                return this.props.addQuestionFailure();
            }
            const question = data.result;
            this.props.addQuestionSuccess(question);
        } catch(e) {
            this.props.addQuestionFailure(e);
        }
    }

    render() {
        return (
            <div className="login-form">
                <h1>Input your question</h1>
                <form onSubmit={this.handleSubmit}>
                    <label> Question Title </label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>

                    <label> Display Name </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>

                    <label> Latest Preferred Reply Date/Time </label>
                    <input type="datetime-local" name="time" value={this.state.date} onChange={this.handleChange}/>

                    <label> Specify your question... </label>
                    <textarea name="description" rows="8" value={this.state.description} onChange={this.handleChange}/>

                    <label> Add tags (maximum 5) </label>
                    <input type="text" name="tag-input" onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                    }} onKeyUp={this.handleAddTag} ref={c => { this.tagInput = c; }}/>

                    <div className="tag-container">
                        {this.state.tags.map((tag, index) =>
                            <Label as='a' color='teal' tag>
                                {tag}
                                <Icon name='delete' link onClick={() => {this.removeTag(index);}}/>
                            </Label>
                        )}
                    </div>
                    <input type="submit" value="Submit Question"/>
                </form>
            </div>
        )
    }
}

QuestionForm.propTypes = {
    questions: PropTypes.object.isRequired,
    isQuestionsLoading: PropTypes.bool,
    questionError: PropTypes.object,
    addQuestion: PropTypes.func,
    addQuestionSuccess: PropTypes.func,
    addQuestionFailure: PropTypes.func,
    addQuestionRequested: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError
    }
};

export default compose(
    withApollo,
    connect(mapStateToProps, {addQuestionSuccess, addQuestionFailure, addQuestionRequested }),
    graphql(ADD_QUESTION_MUTATION, { name: 'addQuestion' }),
)(QuestionForm);