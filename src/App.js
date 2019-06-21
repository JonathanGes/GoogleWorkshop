import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import { Link, Router, Location } from "@reach/router";
import { withTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignIn from "./components/SignIn";
import MyEvents from "./components/MyEvents";
import Event from "./components/Event";
import AppBar from "./components/AppBar";
import { jsx } from "@emotion/core";
import "./App.css";
/* firebase */
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const showAppBar = pathname => !["/", "/sign-in"].includes(pathname);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

@inject("eventStore")
@observer
class App extends Component {
  @computed
  get activeEventId() {
    const activeEvents = this.props.eventStore.events.filter(
      event => event.isActive
    );
    return (activeEvents.length && activeEvents[0].id) || "";
  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <Location>
          {({ location }) => (
            <CssBaseline>
              {showAppBar(location.pathname) && <AppBar />}
              <div
                className="content"
                css={{ padding: "48px 24px", width: "100%" }}
              >
                <Router primary={false}>
                  <SignIn
                    path="/sign-in"
                    default
                    activeEventId={this.activeEventId}
                    user = {user}
                    signInWithGoogle = {signInWithGoogle}

                  />
                  {user && <MyEvents path="/my-events" />}
                  {user && <Event path="event/:eventId" />}
                </Router>
              </div>
            </CssBaseline>
          )}
        </Location>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withTheme()(App));
