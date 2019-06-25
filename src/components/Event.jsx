import { React, Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { observable, action, computed } from "mobx";
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
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  propertyBox: {
    marginBottom: "24px"
  },
  toRight: {
    marginLeft: "auto !important"
  },
  // button: {
  //   marginRight: "8px"
  // },
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
  @observable isDetailsExpanded;

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

    if (props.location.state.isNewEvent) {
      this.toggleIsDetailsExpanded();
    }
    // eventStore.selectedEvent.addTask({ title: "Order sushi", id: "1" });
    console.log(eventStore.selectedEvent.tasks);
  }

  @action
  toggleIsDetailsExpanded = () => {
    this.isDetailsExpanded = !this.isDetailsExpanded;
  };

  @action
  handleChange = name => event => {
    this.assignments[name] = event.target.checked;
  };

  @computed
  get expansionPanelTitle() {
    const { eventStore, eventId } = this.props;
    const { selectedEvent } = eventStore;
    const { title, description, location, dateAndTime } = selectedEvent;

    return `${title} ${dateAndTime || location ? "will take place" : ""} ${
      location ? `at ${location}` : ""
    } ${dateAndTime ? `on ${new Date(dateAndTime).toGMTString()}` : ""}`;
  }

  render(props) {
    const { eventStore, location, classes } = this.props;
    const pathArray = location.pathname.split("/");
    const eventId = pathArray[pathArray.length - 1];

    return (
      <div className={classes.event}>
        <Grid container spacing={8}>
          <Grid container spacing={8}>
            <Grid item>
              <Tooltip title="Go ahead and make your event public!">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                >
                  Publish
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Save your changes. This won't make your event visible to everyone.">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                >
                  Save
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <FormDialog />
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <Tooltip
                title={
                  eventStore.selectedEvent.isActive
                    ? "Put it in the books!"
                    : "Here we go again!"
                }
              >
                <Button
                  variant={
                    eventStore.selectedEvent.isActive ? "contained" : "outlined"
                  }
                  className={classes.button}
                  color="primary"
                  onClick={eventStore.selectedEvent.toggleIsActive}
                >
                  {eventStore.selectedEvent.isActive ? "Archive" : "Unarchive"}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
          </Grid>

          <div className={classes.eventDetails}>
            <Grid container spacing={24}>
              <ExpansionPanel
                style={{ width: "100%" }}
                expanded={this.isDetailsExpanded}
                onChange={this.toggleIsDetailsExpanded}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5">
                    {this.expansionPanelTitle}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
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
                            eventStore.selectedEvent.setTitle(
                              event.target.value
                            )
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
                            eventStore.selectedEvent.setLocation(
                              event.target.value
                            )
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
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>

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
