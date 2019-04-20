import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Event from './Event';
import Grid from '@material-ui/core/Grid';


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
            <Grid item justify="flex-start">
              <Event key={event.id} event={event} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyEvents);