import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Router, Location } from "@reach/router"
import { withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from './components/SignIn';
import MyEvents from './components/MyEvents';
import Event from './components/Event';
import AppBar from './components/AppBar';
import { jsx } from '@emotion/core'
import './App.css';

const showAppBar = pathname => !['/', '/sign-in'].includes(pathname);

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Location>
          {({ location }) => (
            <CssBaseline>
              {showAppBar(location.pathname) && <AppBar />}
              <div className="content" css={{ padding: '48px 24px'}}>
                <Router primary={false}>
                  <SignIn path="/sign-in" default />
                  <MyEvents path="/my-events" />
                  <Event path="event/:eventId" />
                </Router>
              </div>
            </CssBaseline>
          )}
        </Location>
      </div>
    );
  }
}

export default withTheme()(App);
