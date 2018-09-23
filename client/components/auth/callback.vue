<template>
  <div></div>
</template>

<script>

export default {
  name: '',
  props: ['auth'],
  mounted () {
    this.auth.setSession()
  }
}
</script>
