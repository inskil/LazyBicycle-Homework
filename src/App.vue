<template>
  <div id="app">
    <guide-bar style="background-color: #009999"/>
    <detailinfo style="background-color: #FFFFFF"/>
    <!--<div style="font-size: xx-large; background-color: #CCFFFF; color: #009999">
      影视
      <wrapper/>
    </div>
    <div style="font-size: xx-large; background-color: #DDFFFF; color: #009999">
      书籍
      <wrapper/>
    </div>
    -->
  </div>
</template>

<script>
import GuideBar from "@/components/GuideBar.vue"
import Carousel from "@/components/Carousel"
import Wrapper from "@/components/Wrapper"
import detailinfo from "@/components/detailinfo"
export default {
  name: 'app',
  components: {
    Carousel,
    GuideBar,
    Wrapper,
    detailinfo
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
