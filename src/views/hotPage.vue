<template>
    <div id="app">
            <GroupTitle/>
            <GroupContent/>
            <carousel style="background-color: #FFFFFF"/>
            <div style="font-size: xx-large; background-color: #CCFFFF; color: #009999">
              书籍
              <book-wrapper/>
            </div>
            <div style="font-size: xx-large; background-color: #DDFFFF; color: #009999">
              影视
              <movie-wrapper/>
            </div>
    </div>
</template>

<script>
    import Carousel from "@/components/Carousel"
    import BookWrapper from "@/components/BookWrapper"
    import MovieWrapper from "@/components/MovieWrapper"
    import GroupTitle from "../components/GroupTitle";
    import GroupContent from "../components/GroupContent";

    export default {
        name: 'hotPage',
        components: {
            GroupContent,
            GroupTitle,
            Carousel,
            BookWrapper,
            MovieWrapper
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>