<template>
  <md-card class="user-card">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title user-card__title">{{ user.username }}</h3>
        <address class="md-subhead user-card__subtitle">
          <a v-if="user.email" :href="`mailto:${user.email}`">
            Email: {{ user.email }}
          </a>
        </address>
      </md-card-header-text>
    </md-card-header>

    <md-card-actions class="user-card__actions">
      <md-button
        @click="deleteUser({ id: user.id })"
        class="md-icon-button md-accent"
      >
        <md-icon>delete</md-icon>
      </md-button>

      <md-button @click="$emit('editUser')" class="md-icon-button md-primary">
        <md-icon>edit</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserCard",

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions("Users", ["deleteUser"])
  }
};
</script>
