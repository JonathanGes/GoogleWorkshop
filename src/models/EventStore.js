import {
  types,
  destroy,
  onSnapshot,
  getSnapshot,
  applySnapshot
} from "mobx-state-tree";
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
    title: types.optional(types.string, ""),
    artist: types.optional(types.string, "")
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
    },
    save() {
      try {
        if (window.uid !== undefined) {
          window.writeData(JSON.stringify(getSnapshot(self)));
          // console.log("Saving:", JSON.stringify(getSnapshot(self)));
        } else {
          console.log("Can't save, not logged in");
        }
      } catch {
        console.log("Saving Failed");
      }
    },
    load() {
      try {
        if (window.uid !== undefined) {
          window.getData(data => {
            if (data !== undefined && data !== null) {
              applySnapshot(self, JSON.parse(data));
            } else {
              console.log("DB for this user is empty");
            }
          });
        } else {
          console.log("Can't load, not logged in");
        }
      } catch {
        console.log("Loading Failed");
      }
    },
    afterCreate() {
      onSnapshot(self, self.save);
    }
  }))
  .views(self => ({
    get newEventId() {
      return self.events.length
        ? Math.max(...self.events.map(event => parseInt(event.id))) + 1
        : 1;
    },
    get templates() {
      return {
        birthday: {
          tasks: [
            {
              id: "1",
              title: "Choose party theme",
              status: "todo"
            },
            {
              id: "2",
              title: "Reserve venue",
              status: "todo"
            },
            {
              id: "3",
              title: "Order cake",
              status: "todo"
            },
            {
              id: "4",
              title: "Purchase party supplies",
              status: "todo"
            },
            {
              id: "5",
              title: "Purchase food",
              status: "todo"
            },
            {
              id: "6",
              title: "Book DJ",
              status: "todo"
            }
          ],
          playlist: [
            {
              id: "1",
              title: "Happy",
              artist: "Pharrell Williams"
            },
            {
              id: "2",
              title: "Crazy",
              artist: "Gnarls Barkley"
            },
            {
              id: "3",
              title: "The Lovecats",
              artist: "The Cure"
            },
            {
              id: "4",
              title: "Jungle Boogie",
              artist: "Kool & The Gang"
            },
            {
              id: "5",
              title: "Drop it like it's hot",
              artist: "Snoop Dog"
            },
            {
              id: "6",
              title: "Inspector Norse",
              artist: "Todd Terje"
            },
            {
              id: "7",
              title: "Get Busy",
              artist: "Sean Paul"
            },
            {
              id: "8",
              title: "Sweet Child o' Mine’",
              artist: "Guns N' Roses"
            },
            {
              id: "9",
              title: "Need U (100%)’",
              artist: "Duke Dumont featuring AME"
            },
            {
              id: "10",
              title: "Rehab",
              artist: "Amy Winehouse"
            }
          ]
        },
        wedding: {
          tasks: [
            {
              id: "1",
              title: "Hire wedding planner",
              status: "todo"
            },
            {
              id: "2",
              title: "Reserve date and venue",
              status: "todo"
            },
            {
              id: "3",
              title: "Book officiant",
              status: "todo"
            },
            {
              id: "4",
              title: "Hire photographers",
              status: "todo"
            },
            {
              id: "5",
              title: "Purchase dress",
              status: "todo"
            },
            {
              id: "6",
              title: "Book DJ",
              status: "todo"
            },
            {
              id: "7",
              title: "Book florist",
              status: "todo"
            }
          ],
          playlist: [
            {
              id: "1",
              title: "I Loved her First",
              artist: "Heartland"
            },
            {
              id: "2",
              title: "I Hope you Dance",
              artist: "Lee Ann Womack"
            },
            {
              id: "3",
              title: "Celebration",
              artist: "Kool & The Gang"
            },
            {
              id: "4",
              title: "Always And Forever",
              artist: "Heatwave"
            },
            {
              id: "5",
              title: "When You Kiss Me",
              artist: "Shania Twain"
            },
            {
              id: "6",
              title: "Inspector Norse",
              artist: "Todd Terje"
            },
            {
              id: "7",
              title: "Love Shack",
              artist: "B-52’s"
            },
            {
              id: "8",
              title: "Endless Love",
              artist: "Lionel Ritchie & Diana Ross"
            },
            {
              id: "9",
              title: "The Way You Look Tonight ",
              artist: "Frank Sinatra"
            },
            {
              id: "10",
              title: "All of Me",
              artist: "John Legend"
            }
          ]
        },
        babyShower: {
          tasks: [
            {
              id: "1",
              title: "Purchase cupcakes",
              status: "todo"
            },
            {
              id: "2",
              title: "Plan out baby shower games",
              status: "todo"
            },
            {
              id: "3",
              title:
                "Designate someone to pick up the mother-to-be on the day of the shower",
              status: "todo"
            },
            {
              id: "4",
              title: "Clean up around the house",
              status: "todo"
            },
            {
              id: "5",
              title: "Decorate the house",
              status: "todo"
            },
            {
              id: "6",
              title: "Reserve party rental supplies",
              status: "todo"
            }
          ],
          playlist: [
            {
              id: "1",
              title: "We’re Going to Be Friends",
              artist: "The White Stripes"
            },
            {
              id: "2",
              title: "Race You",
              artist: "Elizabeth & The Catapult"
            },
            {
              id: "3",
              title: "Beautiful Day",
              artist: "U2"
            },
            {
              id: "4",
              title: "Count on Me",
              artist: "Bruno Mars"
            },
            {
              id: "5",
              title: "Sweet Pea",
              artist: "Amos Lee"
            },
            {
              id: "6",
              title: "The Littlest Birds",
              artist: "The Be Good Tanyas"
            },
            {
              id: "7",
              title: "Ob-La-Di, Ob-La-Da",
              artist: "The Beatles"
            },
            {
              id: "8",
              title: "Haven’t Met You Yet",
              artist: "Michael Buble"
            },
            {
              id: "9",
              title: "All Smiles",
              artist: "Jess Penner"
            },
            {
              id: "10",
              title: "Upside Down",
              artist: "Jack Johnson"
            }
          ]
        }
      };
    }
  }));

export default EventStore;
