import {Label, Icon} from 'semantic-ui-react';
import React from "react";

class QuestionTag extends React.Component {
    render() {
        return <Label as='a' color='teal' tag>
            {this.props.name}
            <Icon name='delete' />
        </Label>;
    }
}

export default QuestionTag;