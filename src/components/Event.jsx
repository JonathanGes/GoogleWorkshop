import { React, Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { RIEInput, RIETextArea } from "riek";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormDialog from "./FormDialog";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Animate } from "react-simple-animate";
import DateAndTimePickers from "./DateAndTimePickers";
import DeleteIcon from "@material-ui/icons/Delete";
import Tasks from "./Tasks";
import Playlist from "./Playlist";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  propertyBox: {
    marginBottom: "24px"
  },
  toRight: {
    marginLeft: "auto !important"
  },
  button: {
    marginRight: "8px"
  },
  input: {
    display: "none"
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  tasks: {
    display: "flex",
    flexDirection: "column"
  },
  task: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fab: {
    // margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  taskList: {
    alignItems: "flex-start",
    width: "60%"
  },
  addIcon: {
    marginTop: "8px"
  },
  deleteIcon: {
    transform: "scale(0.75)"
  },
  checkboxLabel: {
    marginLeft: "-16px"
  },
  eventDetails: {
    // padding: "0 24px 0 30%"
  },
  editableInput: {
    backgroundColor: theme.palette.primary,
    borderRadius: "2px",
    transition: "backgroundColor 200ms ease-in-out"
  }
});

@inject("eventStore")
@observer
class Event extends Component {
  @observable assignments;

  constructor(props) {
    super(props);
    const { eventStore, eventId } = props;

    this.assignments = {
      callFriends: false,
      callCatering: false,
      championsLeague: false
    };

    if (eventStore.events.map(event => event.id).includes(eventId)) {
      eventStore.setSelectedEvent(eventId);
    } else {
      eventStore.addEvent({
        id: eventId,
        title: "Enter your title",
        description: "Enter your description",
        image:
          "http://teenairsoftcommunity.com/wp-content/uploads/2016/09/Event-pic.jpg"
      });
      eventStore.setSelectedEvent(eventId);
    }

    // eventStore.selectedEvent.addTask({ title: "Order sushi", id: "1" });
    console.log(eventStore.selectedEvent.tasks);
    eventStore.selectedEvent.addPlaylistTrack({
      id: "1",
      title: "SAD!",
      artist: "XXXTENTACION"
    });
    eventStore.selectedEvent.addPlaylistTrack({
      id: "2",
      title: "Hunnybee",
      artist: "Unknown Mortal Orchestra"
    });
    eventStore.selectedEvent.addPlaylistTrack({
      id: "3",
      title: "Still Beating",
      artist: "Mac Demarco"
    });
    eventStore.selectedEvent.addPlaylistTrack({
      id: "4",
      title: "Your DOg",
      artist: "Soccer Mommy"
    });
  }

  @action
  handleChange = name => event => {
    this.assignments[name] = event.target.checked;
  };

  render(props) {
    const { eventStore, location, classes } = this.props;
    const pathArray = location.pathname.split("/");
    const eventId = pathArray[pathArray.length - 1];

    return (
      <div className={classes.event}>
        <Grid container spacing={3}>
          <Grid container>
            <div className="action-buttons" className={classes.actionButtons}>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                >
                  Publish
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <FormDialog />
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
          </Grid>

          <div className={classes.eventDetails}>
            <Grid container>
              <Grid item xs={3}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Title
                  </Typography>
                  <TextField
                    id="title"
                    className={classes.textField}
                    value={eventStore.selectedEvent.title}
                    onChange={event =>
                      eventStore.selectedEvent.setTitle(event.target.value)
                    }
                    placeholder="Who..."
                  />
                </div>
              </Grid>

              <Grid item xs={9}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Description
                  </Typography>
                  <TextField
                    id="description"
                    className={classes.textField}
                    value={eventStore.selectedEvent.description}
                    onChange={event =>
                      eventStore.selectedEvent.setDescription(
                        event.target.value
                      )
                    }
                    placeholder="What..."
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item xs={3}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Location
                  </Typography>
                  <TextField
                    id="location"
                    className={classes.textField}
                    value={eventStore.selectedEvent.location}
                    onChange={event =>
                      eventStore.selectedEvent.setLocation(event.target.value)
                    }
                    placeholder="Where..."
                  />
                </div>
              </Grid>

              <Grid item xs={9}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Date and Time
                  </Typography>
                  <DateAndTimePickers
                    value={eventStore.selectedEvent.dateAndTime}
                    onChange={eventStore.selectedEvent.setDateAndTime}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Tasks
                  </Typography>
                  <div className={classes.tasks}>
                    <Tasks
                      tasks={eventStore.selectedEvent.tasks}
                      addTask={eventStore.selectedEvent.addTask}
                      removeTask={eventStore.selectedEvent.removeTask}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.propertyBox}>
                  <Typography variant="h6" color="primary">
                    Playlist
                  </Typography>
                  <div className={classes.tasks}>
                    <Playlist playlist={eventStore.selectedEvent.playlist} />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Event);
