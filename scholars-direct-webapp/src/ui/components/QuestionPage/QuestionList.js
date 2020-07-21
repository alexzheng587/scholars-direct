import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Button} from 'semantic-ui-react';
import {connect} from "react-redux";
import { fetchQuestions } from "../../../actions/questionAction";
import Question from "./Question";
import Loader from "../Loader";


class QuestionList extends React.Component {
    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        if (this.props.isQuestionsLoading) {
            return <div className="questionList-container"><Loader/></div>;
        }
        if (this.props.questions.length === 0) {
            return <div className="questionList-container">
                <h4>No questions to display at the moment. Feel free to add some to get your inquiries answered!</h4>
            </div>;
        }
        return (<div className="questionList-container">
            <Item.Group divided>
                {this.props.questions.map((question, index) =>
                    <Question
                        title={question.title}
                        username={question.username}
                        time={question.time}
                        desc={question.description}
                        status={question.status}
                        msgKey={index.toString()}
                        id={(question._id)}
                    />
                )}
            </Item.Group>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError
    }
};

export default connect(mapStateToProps, {fetchQuestions})(QuestionList);