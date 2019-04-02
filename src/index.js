import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { Provider } from "mobx-react";

import EventStore from "./models/EventStore";

// create store
const eventStore = EventStore.create();
eventStore.addEvent({title: 'Wow'});

// Provider allows to pass the store to component
const Root = (
  <Provider eventStore={eventStore}>
    <App />
  </Provider>
);

// Patch listener will be invoked whenever the model or any of its descendants is mutated
onPatch(eventStore, patch => {
  console.log('PATCH', patch);
});
makeInspectable(eventStore);

ReactDOM.render(Root, document.getElementById("root"));

serviceWorker.unregister();
