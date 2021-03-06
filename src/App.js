import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { computed, reaction } from "mobx";
import { Link, Router, Location } from "@reach/router";
import { withTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignIn from "./components/SignIn";
import MyEvents from "./components/MyEvents";
import Event from "./components/Event";
import AppBar from "./components/AppBar";
import CreateScreen from "./components/CreateScreen";
import { jsx } from "@emotion/core";
import "./App.css";
/* firebase */
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

const showAppBar = pathname => !["/", "/sign-in"].includes(pathname);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

var database = firebaseApp.database();

window.writeData = user_json_data => {
  firebaseApp
    .database()
    .ref("users/" + window.uid)
    .set(user_json_data);
};

window.getData = data_handler => {
  firebaseApp
    .database()
    .ref("users/" + window.uid)
    .on("value", function(snapshot) {
      // console.log(`user id: ${window.uid}`);
      data_handler(snapshot.val());
      // console.log(snapshot.val());
    });
};

@inject("eventStore")
@observer
class App extends Component {
  constructor(props) {
    super(props);

    reaction(
      () => this.props.user,
      () => {
        if (this.props.user) {
          window.uid = this.props.user.uid;
          this.props.eventStore.load();
        }
      }
    );
  }

  @computed
  get activeEventId() {
    const activeEvents = this.props.eventStore.events.filter(
      event => event.isActive
    );
    return (activeEvents.length && activeEvents[0].id) || "";
  }
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div className="App" style={{ backgroundColor: "rgb(249, 249, 249)" }}>
        <Location>
          {({ location }) => (
            <CssBaseline>
              {showAppBar(location.pathname) && user && (
                <AppBar user={user} signOut={signOut} />
              )}
              <div
                className="content"
                css={{
                  padding: "48px 24px",
                  width: "60%"
                }}
              >
                <Router primary={false}>
                  <SignIn
                    path="/sign-in"
                    default
                    activeEventId={this.activeEventId}
                    user={user}
                    signInWithGoogle={signInWithGoogle}
                    signOut={signOut}
                  />
                  {user && <MyEvents path="/my-events" />}
                  {user && <Event path="event/:eventId" />}
                  {user && <CreateScreen path="event/create" />}
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
  firebaseAppAuth
})(withTheme()(App));
