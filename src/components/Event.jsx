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

const styles = theme => ({
  propertyBox: {
    marginBottom: "24px"
  },
  toRight: {
    marginLeft: "auto"
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  taskList: {
    alignItems: "flex-start",
    width: "30%"
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
      <div className="event">
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
            <FormGroup className={classes.taskList}>
              {eventStore.selectedEvent.tasks.map(task => (
                <Animate
                  play
                  startStyle={{ opacity: 0 }}
                  endStyle={{ opacity: 1 }}
                >
                  <div className="task">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={task.isDone}
                          onChange={task.toggleIsDone}
                          value={task.id}
                        />
                      }
                    />
                    <RIEInput
                      value={task.title}
                      change={({ title }) => task.setTitle(title)}
                      propName="title"
                    />
                  </div>
                </Animate>
              ))}

              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                size="small"
                className={classes.toRight}
              >
                <AddIcon
                  onClick={() =>
                    eventStore.selectedEvent.addTask({
                      id: "2",
                      title: "New task"
                    })
                  }
                />
              </Fab>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Event);
