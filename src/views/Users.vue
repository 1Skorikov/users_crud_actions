<template>
  <div class="users-view">
    <md-card
      class="users-view__add-button"
      md-with-hover
      @click.native="openEditModal(null)"
    >
      <md-ripple>
        <md-button class="md-fab md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </md-ripple>
    </md-card>

    <user-card
      v-for="user in users"
      :key="user.id"
      :user="user"
      @editUser="openEditModal(user)"
    ></user-card>

    <user-form-modal
      :is-visible.sync="showDialog"
      :user="userForEdit"
    ></user-form-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UsersView",

  components: {
    UserCard: () => import("@/components/UserCard.vue"),
    UserFormModal: () => import("@/components/modals/UserFormModal.vue")
  },

  data: () => ({
    showDialog: false,
    userForEdit: null
  }),

  computed: {
    users() {
      return this.allUsers;
    },

    ...mapGetters("Users", ["allUsers"])
  },

  async created() {
    await this.getUsers();
  },

  methods: {
    openEditModal(user = null) {
      this.userForEdit = user;
      this.showDialog = true;
    },

    ...mapActions("Users", ["getUsers", "addUser", "updateUser", "deleteUser"])
  }
};
</script>
