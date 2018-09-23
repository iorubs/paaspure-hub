<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <a class="navbar-brand" href="#/">
      <img src="@/assets/logo-128.png" width="30" height="30" class="d-inline-block align-top" alt="">
      PaaSPure
    </a>

    <b-navbar-toggle target="nav_collapse" class="ml-auto"/>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#/instructions">Getting Started</b-nav-item>
        <b-nav-item href="#/hub">Hub</b-nav-item>
        <b-nav-item href="#/contact">Contact</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button  size="sm" class="my-2 my-sm-0 log"
                               v-show="!auth.isLoggedIn()"
                               @click="auth.login()">
            Log In
          </b-button>

          <b-nav-item-dropdown v-bind:text="profile.nickname"
                               v-show="auth.isLoggedIn()"
                               right>
            <b-dropdown-item href="#/user-hub">
              My Hub
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="auth.logout()">
              Log out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  props: ['auth'],
  computed: {
    profile () {
      return this.auth.isLoggedIn() ? this.auth.getProfile() : {}
    }
  }
}
</script>

<style scoped>
.log {
  margin: 5px 10px 0 0;
}
</style>
