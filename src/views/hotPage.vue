<template>
    <div id="app" style="background-color: #FFFFFF">
        <carousel/>
        <br>
        <Divider><h1>书籍</h1></Divider>
        <book-wrapper/>
        <br>
        <Divider><h1>影视</h1></Divider>
        <movie-wrapper/>
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

    .carousel {
        position: relative;
        display: block;
        overflow: hidden;
        width: 100%;
        width: 100vw;
        height: 100%;
        height: 100vh;
    }

</style>

