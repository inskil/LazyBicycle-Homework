<template>
  <div id="app">
    <guide-bar style="background-color: #009999"/>
    <router-view></router-view>
  </div>
</template>

<script>
import GuideBar from "@/components/GuideBar.vue"

export default {
  name: 'app',
  components: {
    GuideBar,
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

