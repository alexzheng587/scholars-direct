import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import FilterBox from "./FilterBox";

class QuestionPage extends React.Component {
    render() {
        return (
            <div className="question-container">
                <div className='sidebar-container'>
                    <FilterBox/>
                    <QuestionForm/>
                </div>
                <QuestionList/>
                {/*<QuestionEntry title="Calculus Question" name="Mike Wang" description="How to take the derivative of a square root"/>
                <QuestionEntry title="History Essay" name="Nick P." description="When was Jesus Christ born?"/>*/}
            </div>);
    }
}

export default QuestionPage;