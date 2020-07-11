import React from "react";
import '../../styles/Form.css';
import { connect } from 'react-redux';
import {addQuestion} from "../../../actions/questionAction";

let initialState = {
    title: "",
    username: "",
    description: "",
    time: "",
    status: "open"
};

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            date: e.target.value
        });
    }

    handleTimeChange(e) {
        this.setState({
            time: e.target.value
        });
    }

    handleDescChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const s = this.state.title.trim();
        const u = this.state.username.trim();
        console.log(this.state);
        if (s && u) {
            this.props.addQuestion(this.state);
            this.setState(initialState);
        }
    }

    render() {
        return (
            <div className="login-form">
                <h1>Input your question</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="field1" placeholder="Question Title" onChange={this.handleTitleChange}/>
                    <input type="text" name="field2" placeholder="Display Name" onChange={this.handleUserChange}/>
                    <input type="datetime-local" name="field3" placeholder="Date" onfocus="(this.type='date')" onChange={this.handleTimeChange}/>
                    <textarea name="field4" rows="8" placeholder="Specify your question..." onChange={this.handleDescChange}/>
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