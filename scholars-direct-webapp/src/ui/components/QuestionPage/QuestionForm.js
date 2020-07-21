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

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="login-form">
                <h1>Input your question</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Question Title
                    </label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>

                    <label>
                        Display Name
                    </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <label>
                        Latest Preferred Reply Date/Time
                    </label>
                    <input type="datetime-local" name="time" value={this.state.date} onChange={this.handleChange}/>
                    <label>
                        Specify your question...
                    </label>
                    <textarea name="description" rows="8" value={this.state.description}  onChange={this.handleChange}/>
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