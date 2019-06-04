import { types, destroy } from "mobx-state-tree";
import arrayMove from "array-move";

const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    status: types.optional(types.string, "todo"),
    assignee: types.optional(types.string, "")
  })
  .actions(self => ({
    setTitle(title) {
      self.title = title;
    },
    setStatus(status) {
      self.status = status;
    },
    setAssignee(assignee) {
      self.assignee = assignee;
    },
    updateTask(newEventData) {
      for (let key in newEventData) {
        const newValue = newEventData[key];
        if (key === "title") self.setTitle(newValue);
        else if (key === "status") self.setStatus(newValue);
        else if (key === "assignee") self.setAssignee(newValue);
      }
    }
  }));

const PlaylistTrack = types
  .model("PlaylistTrack", {
    id: types.identifier,
    title: types.string,
    artist: types.optional(types.string, "Unknown")
  })
  .actions(self => ({
    setTitle(title) {
      self.title = title;
    },
    setArtist(artist) {
      self.artist = artist;
    },
    updateSong(newEventData) {
      for (let key in newEventData) {
        const newValue = newEventData[key];
        if (key === "title") self.setTitle(newValue);
        else if (key === "artist") self.setArtist(newValue);
      }
    }
  }));

const Event = types
  .model("Event", {
    title: types.string,
    id: types.identifier,
    isActive: types.optional(types.boolean, false),
    description: types.string,
    image: types.string,
    tasks: types.array(Task),
    date: types.maybeNull(types.string),
    time: types.maybeNull(types.string),
    location: types.maybeNull(types.string),
    playlist: types.array(PlaylistTrack)
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
    setLocation(location) {
      self.location = location;
    },
    toggleIsActive() {
      self.isActive = !self.isActive;
    },
    setDescription(description) {
      self.description = description;
    },
    addTask({ id, title, status, assignee }) {
      self.tasks.push(Task.create({ id, title, status, assignee }));
    },
    removeTask(task) {
      destroy(task);
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
    },
    addPlaylistTrack({ id, title, artist }) {
      self.playlist.push(PlaylistTrack.create({ id, title, artist }));
    },
    removePlaylistTrack(playlistTrack) {
      destroy(playlistTrack);
    },
    movePlaylistTrack(oldIndex, newIndex) {
      self.playlist = arrayMove(self.playlist, oldIndex, newIndex);
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
