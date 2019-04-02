import { types } from 'mobx-state-tree';

const User = types.model({
  id: types.string,
  name: types.string
});

const UserStore = types.model({
  events: types.array(Event)
})

export default UserStore;