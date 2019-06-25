import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 260
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  archivedOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.75)"
  }
};

function EventCard(props) {
  const { classes, event } = props;
  return (
    <Card className={`${classes.card} ${!event.isActive ? "archived" : ""}`}>
      <CardActionArea>
        {!event.isActive && (
          <div className={classes.archivedOverlay}>
            {/* <Typography variant="h5" color="error">
              ARCHIVED
            </Typography> */}
          </div>
        )}
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={event.image}
          title={event.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.title}
          </Typography>
          <Typography component="p">{event.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Event.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EventCard);
