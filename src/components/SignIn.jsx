import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "@reach/router";
import GoogleButton from "react-google-button";
import { withFirebase } from '../Firebase'

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    width: "100% !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important"
  }
});

class SignIn extends Component {

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        // this.setState({ error });
      });

    event.preventDefault();
  };

  onSignIn = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        // this.setState({ error });
      });

    event.preventDefault();
  };


  render(){
    const { classes, activeEventId } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.props.user ? `Welcome Back, ${this.props.user.displayName}` : "Sign in"}
          </Typography>
          <form className={classes.form}>
            {this.props.user ? (
              <Link to={activeEventId ? `/event/${activeEventId}` : "/my-events"}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Continue
                </Button>
              </Link>
            ) : (
              <div>
                <FormControl
                  disabled={this.props.user}
                  margin="normal"
                  required
                  fullWidth
                >
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl
                  disabled={this.props.user}
                  margin="normal"
                  required
                  fullWidth
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </div>
            )}
            {this.props.user ? (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.props.signOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link
                to={activeEventId ? `/event/${activeEventId}` : "/my-events"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.props.signInWithGoogle}
                >
                  Sign in
                </Button>
              </Link>
            )}
            {!this.props.user && (
              <Link
                to={activeEventId ? `/event/${activeEventId}` : "/my-events"}
                style={{ textDecoration: "none" }}
              >
                <GoogleButton
                  disabled={this.props.user}
                  className={classes.submit}
                  type="light"
                  onClick={this.props.firebase.doSignInWithGoogle}
                />
              </Link>
            )}
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(SignIn));
