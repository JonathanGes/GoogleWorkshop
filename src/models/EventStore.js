import { types } from 'mobx-state-tree';

const Event = types.model('Event', {
  title: types.string,
  id: Math.random().toString(36).substring(7)
  // owner: types.user,
  // date: types.Date,
  // isActive: types.boolean
})
.actions(self => ({
  setTitle(title) {
    self.title = title
  },
  setOwner(owner) {
    self.owner = owner
  },
  setDate(date) {
    self.date = date
  },
  toggleIsActive() {
    self.isActive = !self.isActive;
  }
}));

const EventStore = types.model('EventStore', {
  events: types.array(Event)
})
.actions(self => ({
  addEvent(event) {
    self.events.push(event);
  },
  removeEvent(event) {
    self.events.splice(self.events.indexOf(event), 1);
  },
  clearEvents() {
    self.events = [];
  }
}));

export default EventStore;