<template>
  <md-app id="app" md-waterfall md-mode="overlap">
    <md-app-toolbar class="md-primary md-large">
      <div class="md-toolbar-row">
        <h1 class="md-title">Users</h1>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss" src="@/assets/scss/index.scss" />
