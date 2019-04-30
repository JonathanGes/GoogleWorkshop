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

const styles = theme => ({
  propertyBox: {
    marginBottom: "24px"
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
  assignments: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

@inject("eventStore")
@observer
class Event extends Component {
  @observable assignments;

  constructor(props) {
    super(props);
    const { eventStore, location } = props;
    const pathArray = location.pathname.split("/");
    const eventId = pathArray[pathArray.length - 1];

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
            {`Event ID: ${eventStore.selectedEvent.id}`}
          </Typography>
        </div>

        <div className={classes.propertyBox}>
          <Typography variant="h6" color="primary">
            Event Title
          </Typography>
          <RIEInput
            value={eventStore.selectedEvent.title}
            change={({ title }) => eventStore.selectedEvent.setTitle(title)}
            propName="title"
          />
        </div>

        <div className={classes.propertyBox}>
          <Typography variant="h6" color="primary">
            Event Description
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
            Assignments
          </Typography>
          <div className={classes.assignments}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.assignments.callFriends}
                    onChange={this.handleChange("callFriends")}
                    value="callFriends"
                  />
                }
                label="Call friends"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.assignments.callCatering}
                    onChange={this.handleChange("callCatering")}
                    value="callCatering"
                  />
                }
                label="Call catering"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.assignments.championsLeague}
                    onChange={this.handleChange("championsLeague")}
                    value="championsLeague"
                  />
                }
                label="Make sure event is not on the same day as the Champions League final"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Event);
