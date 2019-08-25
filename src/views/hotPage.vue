<template>
    <div id="app">
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

    export default {
        name: 'hotPage',
        components: {
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
        color: #2c3e50;
    }
</style>