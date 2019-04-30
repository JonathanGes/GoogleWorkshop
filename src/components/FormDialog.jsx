import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withTheme } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

class FormDialog extends React.Component {
  state = {
    open: false,
    openSnackbar: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  handleInvite = () => {
    this.setState({ open: false, openSnackbar: true });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Invite Friends
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Invite Friends</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To invite friends, type in their emails, separated by commas:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleInvite} color="primary">
              Invite
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Invited Succssefully!</span>}
        />
      </div>
    );
  }
}

export default withTheme()(FormDialog);
