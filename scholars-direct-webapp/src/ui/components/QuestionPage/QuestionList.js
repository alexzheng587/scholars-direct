import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Button} from 'semantic-ui-react';
import {connect} from "react-redux";
import {addQuestion} from "../../../actions";
import Question from "./Question";


class QuestionList extends React.Component {
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
                        id={index}
                    />
                )}
            </Item.Group>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
};

export default connect(mapStateToProps)(QuestionList);