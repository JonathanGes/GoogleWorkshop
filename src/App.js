import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './App.css';

import Event from './components/Event';

@inject('eventStore')
@observer
class App extends Component {
  render() {
    const { eventStore } = this.props;

    return (
      <div className="App">
        {eventStore.events.map(event => <Event key={event.id} event={event} />)}
      </div>
    );
  }
}

export default App;
