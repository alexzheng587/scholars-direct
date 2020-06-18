import React from "react";
import '../../styles/Form.css';

class QuestionForm extends React.Component {
    render() {
        return (
            <div className="login-form">
                <h1>Input your question!</h1>
                <form>
                    <input type="text" name="field1" placeholder="Question Title"/>
                    <input type="time" name="field2" placeholder="Latest Time"/>
                    <textarea name="field3" placeholder="Specify your question..."/>
                    <input type="submit" value="Submit Question"/>
                </form>
            </div>
        )
    }
}

export default QuestionForm;