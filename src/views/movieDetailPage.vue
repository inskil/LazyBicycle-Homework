<template>
    <div id="app">
        <movie-detail/>
    </div>
</template>

<script>
    import movieDetail from "@/components/movieDetail";

    export default {
        name: 'movieDetailPage',
        components: {
            movieDetail,
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