import {Icon, Label} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {addFilterTag, removeFilterTag} from "../../../actions/filterTagAction";


class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.getQuestionTags = this.getQuestionTags.bind(this);
    }

    handleAddTag(e) {
        const tag = e.target.value.trim();
        if (e.key === 'Enter' && tag && this.props.filterTags.length < 5) {
            this.props.addFilterTag(tag);
            this.tagInput.value = null;
        }
    }

    getQuestionTags() {
        let allQuestionTags = [];
        for (let q of this.props.questions) {
            allQuestionTags = allQuestionTags.concat(q.tags.filter((t) => !allQuestionTags.includes(t)));
        }
        return allQuestionTags.map((tag) => (<option value={tag}/>));
    }

    render() {
        return (<div className="login-form">
            <h1>Filters</h1>
            <input type="text" name="tag-input" placeholder="Type here or select tags from the dropdown" onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault();
                }} onKeyUp={this.handleAddTag} ref={c => { this.tagInput = c; }} list="questionTags" autoComplete="off"
            />
            <datalist id="questionTags">
                {
                    this.getQuestionTags()
                }
            </datalist>

            <div className="tag-container">
                {this.props.filterTags.map((tag, index) =>
                    <Label as='a' color='teal' onClick={() => {this.props.removeFilterTag(tag);}}>
                        {tag}
                    </Label>
                )}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questionList,
        isQuestionsLoading: state.questions.isQuestionsLoading,
        questionError: state.questions.questionError,
        filterTags: state.filterTags
    }
};

export default connect(mapStateToProps, {addFilterTag, removeFilterTag})(FilterBox);