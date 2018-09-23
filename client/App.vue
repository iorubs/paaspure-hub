<template>
  <div id="app">
    <navbar :auth="auth"/>
    <router-view :auth="auth" id="content"/>
    <footerbar/>
  </div>
</template>

<script>
import navbar from '@/components/navbar/navbar'
import footerbar from '@/components/footer/footer'

import AuthService from '@/components/auth/utils'
const auth = new AuthService()

export default {
  name: 'App',
  components: {
    navbar,
    footerbar
  },
  data () {
    return {
      auth
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  margin-top: 30px;
  margin-bottom: 60px;
}
</style>
