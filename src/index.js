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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import lime from '@material-ui/core/colors/lime';
import pink from '@material-ui/core/colors/pink';

import EventStore from "./models/EventStore";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

// create store
const eventStore = EventStore.create();

eventStore.addEvent({title: 'Birthday', description: 'Fun', image: 'https://g.foolcdn.com/editorial/images/507501/birthday-cake.jpg'});
eventStore.addEvent({title: 'Farewell', description: 'Wow', image: 'https://image.shutterstock.com/image-vector/farewell-party-template-we-will-260nw-1141279034.jpg'});
eventStore.addEvent({title: 'Party', description: 'Yay', image: 'http://orientindia.com/admin//130/evt_photo/4_event_marketing.jpg'});
eventStore.addEvent({title: 'Baby Shower', description: 'Congrats', image: 'http://clipart-library.com/images/yckrdA6Ri.jpg'});
eventStore.addEvent({title: 'Wedding', description: 'Mazal Tov', image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/08/29/11/royal-wedding-outfits-exhibition-harry-meghan.jpg?w968h681'});
eventStore.addEvent({title: 'New Job Party', description: 'Good Luck', image: 'https://s3.amazonaws.com/tjn-blog-images/wp-content/uploads/2015/06/20004720/find-new-job.jpg'});
eventStore.addEvent({title: 'Graduation', description: 'Finally', image: 'https://edge.alluremedia.com.au/uploads/businessinsider/2015/08/GettyImages-479552530.jpg'});
eventStore.addEvent({title: 'Engagement', description: 'Awww', image: 'https://i.ebayimg.com/images/g/VDoAAOSwuNFbfotu/s-l300.jpg'});
eventStore.addEvent({title: 'Class Reunion', description: 'It has been so long', image: 'https://alumni.smu.edu.sg/sites/alumni.smu.edu.sg/files/styles/large/public/class%20reunion%20group%20web.jpg?itok=aIZsMV2C'});

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff'
    },
    primary: lime,
    secondary: pink
  }
});

// Provider allows to pass the store to component
const Root = (
  <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider eventStore={eventStore}>
          <App />
        </Provider>
      </JssProvider>
  </MuiThemeProvider>
);

// Patch listener will be invoked whenever the model or any of its descendants is mutated
onPatch(eventStore, patch => {
  console.log('PATCH', patch);
});
makeInspectable(eventStore);

ReactDOM.render(Root, document.getElementById("root"));

serviceWorker.unregister();
