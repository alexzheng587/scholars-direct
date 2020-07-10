import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Button} from 'semantic-ui-react';
import {connect} from "react-redux";
import { fetchQuestions } from "../../../actions/questionAction";
import Question from "./Question";


class QuestionList extends React.Component {
    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        return (<div className="questionList-container">
            <Item.Group divided>
                {this.props.questions.map((question, index) =>
                    <Question
                        title={question.title}
                        username={question.username}
                        time={question.time}
                        desc={question.description}
                        status={question.status}
                        msgKey={index}
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