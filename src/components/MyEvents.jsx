import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import EventCard from './EventCard';
import Grid from '@material-ui/core/Grid';
import { Link } from '@reach/router';


const styles = {

};

@inject('eventStore')
@observer
class MyEvents extends Component {
  render() {
    const { eventStore } = this.props;
    
    return (
      <div className="my-events" >
        <Grid container spacing={16} justify="center">
          {eventStore.events.map(event => (
            <Grid item key={event.id}>
              <Link to={`/event/${event.id}`} style={{textDecoration: 'none'}}>
                <EventCard event={event} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyEvents);