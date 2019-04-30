import { types } from "mobx-state-tree";

const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    isDone: types.boolean
  })
  .actions(self => ({
    setTitle(title) {
      self.title = title;
    },
    toggleIsDone() {
      self.isDone = !self.isDone;
    }
  }));

const Event = types
  .model("Event", {
    title: types.string,
    id: types.identifier,
    description: types.string,
    image: types.string,
    tasks: types.array(Task),
    date: types.maybeNull(types.string),
    time: types.maybeNull(types.string)
  })
  .views(self => ({
    get dateAndTime() {
      return self.date && self.time ? `${self.date}T${self.time}` : null;
    }
  }))
  .actions(self => ({
    setTitle(title) {
      self.title = title;
    },
    setOwner(owner) {
      self.owner = owner;
    },
    setDate(date) {
      self.date = date;
    },
    toggleIsActive() {
      self.isActive = !self.isActive;
    },
    setDescription(description) {
      self.description = description;
    },
    addTask({ id, title, isDone = false }) {
      self.tasks.push(Task.create({ id, title, isDone }));
    },
    setDate(date) {
      self.date = date;
    },
    setTime(time) {
      self.time = time;
    },
    setDateAndTime(dateAndTime) {
      console.log(dateAndTime);
      const [date, time] = dateAndTime.split("T");
      self.date = date;
      self.time = time;
    }
  }));

const EventStore = types
  .model("EventStore", {
    events: types.array(Event),
    selectedEvent: types.maybeNull(types.reference(Event))
  })
  .actions(self => ({
    addEvent(eventData) {
      const event = Event.create(eventData);
      self.events.push(event);
    },
    removeEvent(event) {
      self.events.splice(self.events.indexOf(event), 1);
    },
    clearEvents() {
      self.events = [];
    },
    setSelectedEvent(eventId) {
      self.selectedEvent = eventId;
      console.log(self.selectedEvent);
    }
  }));

export default EventStore;
