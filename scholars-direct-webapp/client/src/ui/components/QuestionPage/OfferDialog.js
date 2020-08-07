import React from "react";
import {connect} from "react-redux";

import { offerHelp } from "../../../actions/offerAction";
import {Button} from 'semantic-ui-react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { compose } from 'redux';
import { graphql } from '@apollo/client/react/hoc';
import { ADD_CONTACT_MUTATION } from '../../../graphql/mutations/user/addcontact';
import { CHANGE_STATUS_MUTATION } from '../../../graphql/mutations/question/update-status';
import PropTypes from "prop-types";


class OfferDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, time:null, message:"",pid:"abc",studentID:"",tutorID:"",userId:this.props.id};
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
        this.setState({... this.state,
            time: e.target.value
        });
    }
    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }
    async handleSubmit(e) {
        // todo get tutorID and studentID
        let i = {
            from: "tutor1",
            to: "student1",
            time: this.state.time,
            question:this.state.pid,
            detail: this.state.message,
            status: "IN_PROGRESS"
        };
        const { data } = await this.props.addContact({
            variables: {
                requestId: this.props.userId,
                requestMessage: this.state.message,
            }
        });
        if (!data.result) {
            await this.props.changeStatus({
                variables: {
                    questionId: this.props.id,
                    status: "In progress"
                }
            });
        }
        this.handleClose();


    }

    render() {
        return (<div>
                <Button secondary onClick={this.handleClickOpen} >Offer to help</Button>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">Offer To Help</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Offer to help the asker by sending them a contact request! Feel free to leave an initial response.
                        </DialogContentText>
                        <TextField
                            onChange={this.setMessage}
                            id="outlined-multiline-flexible"
                            label="Response"
                            placeholder="Type your response here"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Send Contact
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

OfferDialog.propTypes = {
    addContact: PropTypes.func,
    changeStatus: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
    }
};

export default compose(
    connect(mapStateToProps, {offerHelp}),
    graphql(ADD_CONTACT_MUTATION, {name: 'addContact'}),
    graphql(CHANGE_STATUS_MUTATION, {name: 'changeStatus'})
)(OfferDialog);
