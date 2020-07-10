import React from "react";
import {connect} from "react-redux";

import { offerHelp } from "../../../actions/questionAction";
import {Button} from 'semantic-ui-react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


class OfferDialog extends React.Component {
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
        return (<div>
                <Button primary onClick={this.handleClickOpen} color='teal'>Offer to help</Button>
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
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
    }
};

export default connect(mapStateToProps, {offerHelp})(OfferDialog);