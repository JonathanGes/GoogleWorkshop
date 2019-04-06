import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Router } from "@reach/router"
import SignIn from './components/SignIn';
import Events from './components/Events';

import './App.css';

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SignIn path="/sign-in" default />
          <Events path="/events" />
        </Router>
      </div>
    );
  }
}

export default App;
