import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import FilterBox from "./FilterBox";
import {connect} from "react-redux";

class QuestionPage extends React.Component {

    render() {
        // if (!this.props.auth.loggedIn) {
        //     return <div className="question-container">
        //         <h3>Please sign in with your account to view or ask questions.</h3>
        //     </div>;
        // }
        return (
            <div className="question-container">
                <div className='sidebar-container'>
                    <FilterBox/>
                    <QuestionForm/>
                </div>
                <QuestionList/>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authentication
    }
};

export default connect(mapStateToProps, {})(QuestionPage);