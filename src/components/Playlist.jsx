import React, { Component, useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withStyles, withTheme } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import { computed, observable, action } from "mobx";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  fab: {
    float: "right"
  }
});

const SortableItem = sortableElement(({ index, title, artist }) => {
  return (
    <ListItem divider style={{ cursor: "grab" }}>
      <ListItemText>{`${index + 1}   ${title} - ${artist}`}</ListItemText>
    </ListItem>
  );
});

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
        <SortableContainer onSortEnd={this.onSortEnd}>
          {playlist.map((track, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              index={index}
              title={track.title}
              artist={track.artist}
              className={classes.track}
            />
          ))}
        </SortableContainer>
        <Fab
          color="primary"
          aria-label="Add"
          size="small"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Playlist);
