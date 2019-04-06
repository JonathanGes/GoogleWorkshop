import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Event from './Event';

@inject('eventStore')
@observer
class Events extends Component {
  render() {
    const { eventStore } = this.props;
    
    return (
      <div className="events">
        {eventStore.events.map(event => <Event key={event.id} event={event} />)}
      </div>
    );
  }
}

export default Events;