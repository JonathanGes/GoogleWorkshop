import React, { Component } from "react";
import { observable, action, computed } from "mobx";
import { inject } from "mobx-react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { Link, Location } from "@reach/router";

const styles = theme => ({
  createScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    top: "0",
    left: "0",
    zIndex: "100"
  },
  content: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  stretch: {
    height: "100%",
    width: "100%"
  },
  card: {
    width: "300px",
    height: "300px",
    cursor: "pointer",
    transition: "box-shadow 200ms ease-in-out",
    // marginTop: "60px",
    "&:hover": {
      boxShadow: "0 0 30px -6px gray",
      border: `1px solid ${theme.palette.primary} !important`
    }
  },
  media: {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  button: {
    textDecoration: "none"
  }
});

@inject("eventStore")
class CreateScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const cardHoverStyle = { "&:hover": { outline: "1px solid #3778C2" } };
    return (
      <div className={classes.createScreen}>
        <div className={classes.content}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.stretch}
            direction="column"
            spacing={24}
          >
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item>
                <Link
                  to={`/event/${this.props.eventStore.newEventId}`}
                  className={`${classes.button}`}
                  state={{ isNewEvent: true, eventType: "birthday" }}
                >
                  <Card className={classes.card} css={cardHoverStyle}>
                    <CardHeader
                      title="Birthday"
                      titleTypographyProps={{ align: "center" }}
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZdxMhyZGkg1uFU_iGT_t7-xFUunsZPUw9UFMhDZu6hlnkeTVK8w"
                    />
                  </Card>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={`/event/${this.props.eventStore.newEventId}`}
                  className={`${classes.button}`}
                  state={{ isNewEvent: true, eventType: "wedding" }}
                >
                  <Card className={classes.card} css={cardHoverStyle}>
                    <CardHeader
                      title="Wedding"
                      titleTypographyProps={{ align: "center" }}
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbz-prince-harry-meghan-markle-index-1526934897.jpg?crop=1xw:1xh;center,top&resize=480:*"
                    />
                  </Card>
                </Link>
              </Grid>

              <Grid item>
                <Link
                  to={`/event/${this.props.eventStore.newEventId}`}
                  className={`${classes.button}`}
                  state={{ isNewEvent: true, eventType: "babyShower" }}
                >
                  <Card className={classes.card} css={cardHoverStyle}>
                    <CardHeader
                      title="Baby Shower"
                      titleTypographyProps={{ align: "center" }}
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://d1ohrx9ht8bvf4.cloudfront.net/wp-content/uploads/2017/11/26182054/pink-and-grey-baby-shower.jpg"
                    />
                  </Card>
                </Link>
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: "48px" }}
            >
              <Grid item>
                <Link
                  to={`/event/${this.props.eventStore.newEventId}`}
                  className={`${classes.button}`}
                  state={{ isNewEvent: true }}
                >
                  <Button variant="contained" color="primary">
                    Create from Scratch
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateScreen);
