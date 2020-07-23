import {Icon, Label} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {addFilterTag, removeFilterTag} from "../../../actions/filterTagAction";


class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTag = this.handleAddTag.bind(this);
    }

    handleAddTag(e) {
        const tag = e.target.value.trim();
        if (e.key === 'Enter' && tag && this.props.filterTags.length < 5) {
            this.props.addFilterTag(tag);
            this.tagInput.value = null;
        }
    }

    render() {
        return (<div className="login-form">
            <h1>Filters</h1>
            <input type="text" name="tag-input" placeholder="Type your tags here to filter questions..." onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault();
                }} onKeyUp={this.handleAddTag} ref={c => { this.tagInput = c; }}/>

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