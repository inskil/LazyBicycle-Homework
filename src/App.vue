<template>
  <div id="app">
    <guide-bar style="background-color: #009999"/>
<!--    <carousel style="background-color: #FFFFFF"/>-->
<!--    <div style="font-size: xx-large; background-color: #CCFFFF; color: #009999">-->
<!--      书籍-->
<!--      <book-wrapper/>-->
<!--    </div>-->
<!--    <div style="font-size: xx-large; background-color: #DDFFFF; color: #009999">-->
<!--      影视-->
<!--      <movie-wrapper/>-->
<!--    </div>-->
    <hot-books/>
    <h1><br>新书速递</h1>
    <new-books/>
    <h1><br>好书推荐</h1>
    <new-books/>
  </div>
</template>

<script>
import GuideBar from "@/components/GuideBar.vue"
// import Carousel from "@/components/Carousel"
// import BookWrapper from "@/components/BookWrapper"
// import MovieWrapper from "@/components/MovieWrapper"
import HotBooks from "./components/HotBooks";
import NewBooks from "./components/NewBooks";
export default {
  name: 'app',
  components: {
    GuideBar,
    // Carousel,
    // BookWrapper,
    // MovieWrapper
    HotBooks,
    NewBooks
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
