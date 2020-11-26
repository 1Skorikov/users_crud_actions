import Api from "@/api";

export default {
  addUser({ username, email }) {
    return new Promise((resolve, reject) => {
      Api.post("/users", { username, email })
        .then(response => resolve(response.data))
        .catch(reject);
    });
  },

  getUsers() {
    return new Promise((resolve, reject) => {
      Api.get(`/users`)
        .then(response => resolve(response.data))
        .catch(reject);
    });
  },

  updateUser({ id, username, email }) {
    return new Promise((resolve, reject) => {
      Api.put(`/users/${id}`, {
        username,
        email
      })
        .then(response => resolve(response.data))
        .catch(reject);
    });
  },

  deleteUser({ id }) {
    return new Promise((resolve, reject) => {
      Api.delete(`/users/${id}`)
        .then(response => resolve(response.data))
        .catch(reject);
    });
  }
};
