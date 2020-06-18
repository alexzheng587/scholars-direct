import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';

class QuestionEntry extends React.Component {
    render() {
        return (<div className="question-entry">
            <h4>{this.props.title}</h4>
            <div>
                <span>{this.props.name}</span>
                <span>{this.props.details}</span>
            </div>
            <div>{this.props.description}</div>
            <button>Expand</button>
        </div>);
    }
}

export default QuestionEntry;