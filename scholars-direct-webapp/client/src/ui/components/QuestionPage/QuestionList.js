import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Button} from 'semantic-ui-react';
import {connect} from "react-redux";
import {
    fetchQuestionsFailure,
    fetchQuestionsSuccess,
    fetchQuestionsRequested} from "../../../actions/questionAction";
import Question from "./Question";
import Loader from "../Loader";
import {compose} from "redux";
import {withApollo, graphql} from "@apollo/client/react/hoc";
import PropTypes from "prop-types";
import {QUERY_QUESTIONS} from "../../../graphql/queries/question/questions";


class QuestionList extends React.Component {
    constructor(props) {
        super(props);

        this.handleFetchQuestions = this.handleFetchQuestions.bind(this);
    }

    componentDidMount() {
        this.handleFetchQuestions().then(() => console.log('Questions have been fetched'));
    }

    async handleFetchQuestions() {
        try {
            this.props.fetchQuestionsRequested();
            await this.props.questionList.refetch();

            this.props.fetchQuestionsSuccess(this.props.questionList.data);
        } catch(e) {
            this.props.fetchQuestionsFailure(e);
        }
    }

    render() {
        if (this.props.isQuestionsLoading || this.props.questionList.loading) {
            return <div className="questionList-container"><Loader/></div>;
        }
        if (this.props.questions.length === 0) {
            return <div className="questionList-container">
                <h4>No questions to display at the moment. Feel free to add some to get your inquiries answered!</h4>
            </div>;
        }
        return (<div className="questionList-container">
            <Button circular icon='sync' color='grey' floated='right' onClick={async () => {await this.handleFetchQuestions(); }}/>
            <Item.Group divided>
                {this.props.questions.filter((question) =>
                    this.props.filterTags.map(t => t.toLowerCase()).every(tag =>
                        question.tags.map(t => t.toLowerCase()).includes(tag))
                ).map((question, index) =>
                    <Question
                        title={question.title}
                        username={question.username}
                        time={question.time}
                        desc={question.description}
                        status={question.status}
                        tags={question.tags}
                        msgKey={index.toString()}
                        id={(question._id)}
                    />
                )}
            </Item.Group>
        </div>);
    }
}

QuestionList.propTypes = {
    questions: PropTypes.object.isRequired,
    isQuestionsLoading: PropTypes.bool,
    questionError: PropTypes.object,
    auth: PropTypes.object.isRequired,
    filterTags: PropTypes.arrayOf(PropTypes.string),
    fetchQuestionsSuccess: PropTypes.func,
    fetchQuestionsFailure: PropTypes.func,
    fetchQuestionsRequested: PropTypes.func,
    questionList: PropTypes.shape({
        refetch: PropTypes.func,
        loading: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.shape()),
    }),
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError,
        filterTags: state.filterTags,
        auth: state.authentication
    }
};

export default compose(
    withApollo,
    connect(mapStateToProps, {fetchQuestionsSuccess, fetchQuestionsRequested, fetchQuestionsFailure }),
    graphql(QUERY_QUESTIONS, { name: 'questionList' }),
)(QuestionList);