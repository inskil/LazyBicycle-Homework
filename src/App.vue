<template>
  <div id="app">
    <guide-bar/>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GuideBar from "@/components/GuideBar";
export default {
  name: 'app',
  components: {
    HelloWorld,
    GuideBar
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
</style>
<style lang="scss">
  @import "style/Color.scss";
  #app{
    background: $mybeige;
  }
</style>