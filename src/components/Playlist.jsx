import React, { Component, useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withStyles, withTheme } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import { computed, observable, action } from "mobx";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  fab: {
    float: "right"
  },
  track: {
    transition: "background-color 200ms ease-in-out",
    width: "100%",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
      "& $deleteIcon": {
        opacity: "1"
      }
    }
  },
  deleteIcon: {
    transition: "opacity 200ms ease-in-out",
    opacity: "0"
  }
});

const DragHandle = sortableHandle(() => (
  <DragHandleIcon style={{ cursor: "grab" }} />
));

const SortableItem = sortableElement(
  ({
    index,
    title,
    artist,
    setTitle,
    setArtist,
    remove,
    className,
    deleteIconClassName
  }) => {
    return (
      <ListItem divider className={className}>
        <DragHandle />
        <span style={{ marginLeft: "8px", marginRight: "16px" }}>{`${index +
          1}`}</span>
        <div
          className="track-details"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <TextField
            value={`${title}`}
            InputProps={{
              disableUnderline: true,
              autoFocus: title === ""
            }}
            placeholder="Title"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />

          <TextField
            value={`${artist}`}
            placeholder="Artist"
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "12px", marginTop: "-8px" }
            }}
            onChange={event => setArtist(event.target.value)}
          />
        </div>
        <IconButton style={{ marginLeft: "auto" }}>
          <DeleteIcon className={deleteIconClassName} onClick={remove} />
        </IconButton>
      </ListItem>
    );
  }
);

const SortableContainer = sortableContainer(({ children }) => {
  return <List>{children}</List>;
});

@inject("eventStore")
@observer
class Playlist extends Component {
  constructor(props) {
    super(props);
    const { eventStore } = this.props;
    const { selectedEvent } = eventStore;
    const { playlist, addPlaylistTrack, removePlaylistTrack } = selectedEvent;
  }

  @computed
  get playlistTrackId() {
    const { eventStore } = this.props;
    const { selectedEvent } = eventStore;
    const { playlist, addPlaylistTrack, removePlaylistTrack } = selectedEvent;

    return playlist.length
      ? (parseInt(playlist[playlist.length - 1].id) + 1).toString()
      : "1";
  }

  @action
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { eventStore } = this.props;
    const { selectedEvent } = eventStore;
    const { playlist, addPlaylistTrack, removePlaylistTrack } = selectedEvent;
    selectedEvent.movePlaylistTrack(oldIndex, newIndex);
  };

  render() {
    const { eventStore, classes } = this.props;
    const { selectedEvent } = eventStore;
    const { playlist, addPlaylistTrack, removePlaylistTrack } = selectedEvent;

    return (
      <div className={classes.playlist}>
        <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
          {playlist.map((track, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              index={index}
              title={track.title}
              artist={track.artist}
              setTitle={track.setTitle}
              setArtist={track.setArtist}
              remove={() => removePlaylistTrack(track)}
              className={classes.track}
              deleteIconClassName={classes.deleteIcon}
            />
          ))}
        </SortableContainer>
        <Fab
          color="secondary"
          aria-label="Add"
          size="small"
          className={classes.fab}
        >
          <AddIcon
            onClick={() => addPlaylistTrack({ id: this.playlistTrackId })}
          />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Playlist);
