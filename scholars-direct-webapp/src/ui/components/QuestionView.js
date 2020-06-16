import React from "react";
import '../styles/Form.css';
import '../styles/QuestionPage.css';
import QuestionEntry from "./QuestionEntry";

class QuestionView extends React.Component {
    render() {
        return (<div className="question-view">
            <QuestionEntry title="Calculus Question" name="Mike Wang" description="How to take the derivative of a square root"/>
            <QuestionEntry title="History Essay" name="Nick P." description="When was Jesus Christ born?"/>
        </div>);
    }
}

export default QuestionView;