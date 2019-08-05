import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import { withStyles, withTheme } from "@material-ui/core/styles";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import { Link } from "@reach/router";
import { Animate } from "react-simple-animate";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CreateScreen from "../components/CreateScreen";
import { observable } from "rxjs";
import Button from "@material-ui/core/Button";
import Screensaver from "../screensaver.svg";

const styles = {
  button: {
    textDecoration: "none"
  }
};

@inject("eventStore")
@observer
class MyEvents extends Component {
  @computed
  get activeEvents() {
    const { eventStore } = this.props;
    return eventStore.events.filter(event => event.isActive);
  }

  @computed
  get archivedEvents() {
    const { eventStore } = this.props;
    return eventStore.events.filter(event => !event.isActive);
  }

  render() {
    const { eventStore, classes } = this.props;

    return (
      <Fragment>
        <div className="my-events">
          {!eventStore.events.length ? (
            <Grid container alignItems="center" direction="column" spacing={24}>
              <Grid item>
                <Typography variant="h6" color="primary">
                  You have no events...
                </Typography>
              </Grid>
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img
                    style={{ width: "35%", height: "35%" }}
                    src={Screensaver} alt=""
                  />
                </div>
              </Grid>
              <Grid item>
                <Link
                  to={`/event/create`}
                  className={`${classes.button}`}
                  state={{ isNewEvent: true }}
                >
                  <Button variant="contained" color="primary">
                    Create a new event
                  </Button>
                </Link>
              </Grid>
            </Grid>
          ) : null}
          <Grid container spacing={16}>
            {this.activeEvents.length ? (
              <Fragment>
                {this.activeEvents.map(event => (
                  <Grid item key={event.id}>
                    <Link
                      to={`/event/${event.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Animate
                        play
                        startStyle={{ opacity: 0 }}
                        endStyle={{ opacity: 1 }}
                      >
                        <EventCard event={event} />
                      </Animate>
                    </Link>
                  </Grid>
                ))}
              </Fragment>
            ) : null}
          </Grid>

          {this.archivedEvents.length ? (
            <Fragment>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <Typography variant="h5" color="primary">
                  Archive
                </Typography>
              </Grid>
              <Grid container spacing={16}>
                {this.archivedEvents.map(event => (
                  <Grid item key={event.id}>
                    <Link
                      to={`/event/${event.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Animate
                        play
                        startStyle={{ opacity: 0 }}
                        endStyle={{ opacity: 1 }}
                      >
                        <EventCard event={event} />
                      </Animate>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Fragment>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyEvents);
