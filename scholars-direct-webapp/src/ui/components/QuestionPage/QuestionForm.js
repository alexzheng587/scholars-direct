import React from "react";
import '../../styles/Form.css';
import { connect } from 'react-redux';
import {addQuestion} from "../../../actions/questionAction";
import QuestionTag from "./QuestionTag";
import {Icon, Label} from 'semantic-ui-react';

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
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            return;
        }
        e.preventDefault();
        const s = this.state.title.trim();
        const u = this.state.username.trim();
        const d = this.state.description.trim();
        const t = this.state.tags;

        if (s && u && d && d.length > 140 && t.length > 0) {
            this.props.addQuestion(this.state);
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

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError
    }
};

export default connect(mapStateToProps, {addQuestion})(QuestionForm);