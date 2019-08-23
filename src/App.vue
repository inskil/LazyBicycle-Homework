<template>
  <div id="app">
    <guide-bar/>
    <Hot/>
  </div>
</template>

<script>
import GuideBar from "@/components/GuideBar.vue"
import Hot from "@/components/Hot.vue"
export default {
  name: 'app',
  components: {
    GuideBar,
    Hot
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
<!--<style lang="scss">-->
<!--  @import "style/Color.scss";-->
<!--  #app{-->
<!--    background: $mybeige;-->
<!--  }-->
<!--</style>-->
