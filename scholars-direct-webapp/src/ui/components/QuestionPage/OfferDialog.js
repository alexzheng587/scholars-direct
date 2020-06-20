import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function OfferDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
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
    );
}
