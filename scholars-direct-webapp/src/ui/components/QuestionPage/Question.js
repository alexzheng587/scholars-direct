import React from "react";
import '../../styles/Form.css';
import '../../styles/QuestionPage.css';
import {Item, Image, Button} from 'semantic-ui-react';
import {Card} from '@material-ui/core';
import { connect } from 'react-redux';
import {deleteQuestion, offerHelp} from "../../../actions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

class Question extends React.Component {
    constructor() {
        super();
        this.state = {open: false, time:"", message:"",pid:"",posterID:"",tutorID:""};
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setTime = this.setTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClickOpen() {
        this.setState(e => ({
            open: true
        }));
    }

    handleClose() {
        this.setState(e => ({
            open: false
        }));
    }
    setTime(e) {
        this.setState({
            time: e.target.value
        });
    }
    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }
    handleSubmit(e) {
        this.handleClose();
        // todo get tutorID and posterID
        this.setState({
            tutorID: "",
            posterID: ""
        });
            this.props.offerHelp(this.state);
    }
    render() {

        return (<Item className="question-item">
            <Item.Content>
                <Item.Header as='h4'>{this.props.title}</Item.Header>
                <Item.Meta>{this.props.username}</Item.Meta>
                <Item.Meta>{this.props.time}</Item.Meta>

                <Item.Description>
                    {this.props.desc}

                </Item.Description>
                <Item.Extra>
                    <div>{this.props.status}</div>
                    <Button primary onClick={this.handleClickOpen}>Offer to help</Button>
                    <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <DialogTitle id="simple-dialog-title">Offer To Help</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Post your solution, or schedule a video meeting with the poster.
                            </DialogContentText>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Response"
                                placeholder="Type your solution here"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                onChange={this.setMessage}
                            />
                            <TextField
                                id="datetime-local"
                                label="Book a meeting"
                                type="datetime-local"
                                defaultValue="2020-05-24T10:30"
                                margin = 'dense'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.setTime}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSubmit} color="primary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button circular icon='delete' floated='right' onClick={() => this.props.deleteQuestion(this.props.id)}/>
                </Item.Extra>
            </Item.Content>
        </Item>);
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
    }
};

export default connect(mapStateToProps, {deleteQuestion,offerHelp})(Question);