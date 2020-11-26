import UsersProvider from "@/api/modules/users";
import { TYPES_USERS } from "@/store/types";

const state = () => ({
  users: []
});

const getters = {
  allUsers: state => state.users
};

const actions = {
  addUser() {
    return new Promise((resolve, reject) => {
      UsersProvider.addUser({ username: "test", email: "test mail" })
        .then(user => {
          console.log("addUser", user);
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

  updateUser() {
    return new Promise((resolve, reject) => {
      UsersProvider.updateUser({
        id: 1,
        username: "updated username",
        email: "updated email"
      })
        .then(user => {
          console.log("updateUser", user);
          resolve(user);
        })
        .catch(reject);
    });
  },

  deleteUser() {
    return new Promise((resolve, reject) => {
      UsersProvider.deleteUser({ id: 5 })
        .then(user => {
          console.log("deleteUser", user);
          resolve(user);
        })
        .catch(reject);
    });
  }
};

const mutations = {
  [TYPES_USERS.INIT_USERS](state, users) {
    state.users = users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
