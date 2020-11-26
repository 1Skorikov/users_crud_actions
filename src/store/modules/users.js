import UsersProvider from "@/api/modules/users";
import { TYPES_USERS } from "@/store/types";

const state = () => ({
  users: []
});

const getters = {
  allUsers: state => state.users.slice().sort((a, b) => a.id - b.id)
};

const actions = {
  addUser({ commit }, { username, email }) {
    return new Promise((resolve, reject) => {
      UsersProvider.addUser({ username, email })
        .then(user => {
          console.log("addUser", user);
          commit(TYPES_USERS.INIT_USERS, user);
          resolve(user);
        })
        .catch(reject);
    });
  },

  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      UsersProvider.getUsers()
        .then(users => {
          console.log("getUsers", users);
          commit(TYPES_USERS.INIT_USERS, users);
          resolve(users);
        })
        .catch(reject);
    });
  },

  updateUser({ commit }, { id, username, email }) {
    return new Promise((resolve, reject) => {
      UsersProvider.updateUser({
        id,
        username,
        email
      })
        .then(user => {
          console.log("updateUser", user);
          commit(TYPES_USERS.INIT_USERS, user);
          resolve(user);
        })
        .catch(reject);
    });
  },

  deleteUser({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      UsersProvider.deleteUser({ id })
        .then(user => {
          console.log("deleteUser", user);
          commit(TYPES_USERS.DELETE_USER, id);
          resolve(user);
        })
        .catch(reject);
    });
  }
};

const mutations = {
  [TYPES_USERS.INIT_USERS](state, users) {
    const list = Array.isArray(users) ? users : [users];
    const ids = list.map(e => e.id);

    state.users = [...state.users.filter(e => !ids.includes(e.id)), ...list];
  },

  [TYPES_USERS.DELETE_USER](state, id) {
    state.users = state.users.filter(e => e.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
