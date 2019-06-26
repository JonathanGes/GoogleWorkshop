import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, Location } from "@reach/router";
import { inject, observer } from "mobx-react";
import { computed, reaction, observable } from "mobx";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginBottom: "50px"
  },
  toRight: {
    "margin-left": "auto"
  },
  button: {
    color: "white",
    textDecoration: "none"
  }
});

const titleByPathname = {
  "/my-events": "My Events",
  "/event/1": "Event"
};

@inject("eventStore")
@observer
class SimpleAppBar extends Component {
  getTitle(pathname, eventTitle) {
    return pathname.includes("/event/")
      ? eventTitle
      : `Events of ${this.props.user.displayName}`;
  }

  render() {
    const {
      classes,
      location,
      eventStore: { selectedEvent }
    } = this.props;

    return (
      <div className={classes.root}>
        {/* This invisible div is a patch to make mobx state tree notice a change within the location HOC */}
        <div style={{ display: "none" }}>
          {selectedEvent && selectedEvent.title}
        </div>

        <Location>
          {({ location }) => (
            <AppBar color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {this.getTitle(
                    location.pathname,
                    selectedEvent && selectedEvent.title
                  )}
                </Typography>
                <Link
                  to="/my-events"
                  className={`${classes.toRight} ${classes.button}`}
                >
                  <Button
                    color="inherit"
                    disabled={location.pathname.includes("my-events")}
                  >
                    My Events
                  </Button>
                </Link>

                <Link
                  to="/event/create"
                  className={`${classes.button}`}
                  state={{ isNewEvent: true }}
                >
                  <Button color="inherit">Create</Button>
                </Link>

                <Link to="/sign-in" className={classes.button}>
                  <Button color="inherit" onClick={this.props.signOut}>
                    Logout
                  </Button>
                </Link>
              </Toolbar>
            </AppBar>
          )}
        </Location>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SimpleAppBar);
