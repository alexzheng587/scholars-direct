import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import QuestionEntry from "./QuestionEntry";
import QuestionForm from "./QuestionForm";
import Card from '@material-ui/core/Card';
import QuestionList from "./QuestionList";

class QuestionPage extends React.Component {
    render() {
        return (
            <div className="question-container">
                <QuestionForm/>
                <QuestionList/>
                {/*<QuestionEntry title="Calculus Question" name="Mike Wang" description="How to take the derivative of a square root"/>
                <QuestionEntry title="History Essay" name="Nick P." description="When was Jesus Christ born?"/>*/}
            </div>);
    }
}

export default QuestionPage;