<template>
  <md-card class="user-card">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">{{ user.username }}</h3>
        <address class="md-subhead">
          <a :href="`mailto:${user.email}`">Email: {{ user.email }}</a>
          <p>City: {{ user.address.city }}</p>
        </address>
      </md-card-header-text>
    </md-card-header>

    <md-card-actions class="user-card__actions">
      <md-button class="md-icon-button md-accent">
        <md-icon>delete</md-icon>
      </md-button>

      <md-button @click="$emit('editUser')" class="md-icon-button md-primary">
        <md-icon>edit</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "UserCard",

  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
