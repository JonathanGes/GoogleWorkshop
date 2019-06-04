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
import Tasks from './Tasks';
import Playlist from './Playlist';


const styles = theme => ({
  propertyBox: {
    marginBottom: "24px"
  },
  toRight: {
    marginLeft: "auto !important"
  },
  button: {
    margin: theme.spacing.unit
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
    eventStore.selectedEvent.addPlaylistTrack({id: '1', title: 'wow', artist: 'oh'});
    eventStore.selectedEvent.addPlaylistTrack({id: '2', title: 'omg', artist: 'eminem'});
    eventStore.selectedEvent.addPlaylistTrack({id: '3', title: 'super', artist: 'drake'});
    eventStore.selectedEvent.addPlaylistTrack({id: '4', title: 'last nite', artist: 'strokes'});
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
        <div className="action-buttons" className={classes.actionButtons}>
          <FormDialog />
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
          >
            Save
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
          >
            Publish
          </Button>
        </div>

        <div className={classes.eventDetails}>
          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Title
            </Typography>
            <RIEInput
              value={eventStore.selectedEvent.title}
              change={({ title }) => eventStore.selectedEvent.setTitle(title)}
              propName="title"
            />
          </div>

          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Description
            </Typography>
            <RIETextArea
              value={eventStore.selectedEvent.description}
              change={({ description }) =>
                eventStore.selectedEvent.setDescription(description)
              }
              propName="description"
            />
          </div>

          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Location
            </Typography>
            <RIETextArea
              value={eventStore.selectedEvent.location || "Enter location"}
              change={({ location }) =>
                eventStore.selectedEvent.setLocation(location)
              }
              propName="location"
            />
          </div>

          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Date and Time
            </Typography>
            <DateAndTimePickers
              value={eventStore.selectedEvent.dateAndTime}
              onChange={eventStore.selectedEvent.setDateAndTime}
            />
          </div>

          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Tasks
            </Typography>
            <div className={classes.tasks}>
              <Tasks tasks={eventStore.selectedEvent.tasks} addTask={eventStore.selectedEvent.addTask} removeTask={eventStore.selectedEvent.removeTask} />
            </div>
          </div>

          <div className={classes.propertyBox}>
            <Typography variant="h6" color="primary">
              Playlist
            </Typography>
            <div className={classes.tasks}>
              <Playlist playlist={eventStore.selectedEvent.playlist} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Event);
