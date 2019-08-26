<template>
    <div id="app">
        <hot-movies/>
        <br>
        <Divider><h1>最新电影</h1></Divider>
        <new-movies/>
        <br>
        <Divider><h1>高分电影</h1></Divider>
        <new-movies/>
    </div>
</template>

<script>
    import HotMovies from "@/components/HotMovies";
    import NewMovies from "@/components/NewMovies";
    export default {
        name: 'moviePage',
        components: {
            HotMovies,
            NewMovies
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
