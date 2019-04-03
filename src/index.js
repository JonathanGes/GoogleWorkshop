import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { Provider } from "mobx-react";

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import EventStore from "./models/EventStore";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

// create store
const eventStore = EventStore.create();
eventStore.addEvent({title: 'Wow'});
eventStore.addEvent({title: 'This is urgent', isUrgent: true});

// Provider allows to pass the store to component
const Root = (
	<JssProvider jss={jss} generateClassName={generateClassName}>
		<Provider eventStore={eventStore}>
			<App />
		</Provider>
	</JssProvider>
);

// Patch listener will be invoked whenever the model or any of its descendants is mutated
onPatch(eventStore, patch => {
  console.log('PATCH', patch);
});
makeInspectable(eventStore);

ReactDOM.render(Root, document.getElementById("root"));

serviceWorker.unregister();
