<template>
    <div id="app">
        <discussion/>
    </div>
</template>

<script>
    import Discussion from "@/components/Discussion";

    export default {
        name: 'topicPage',
        components: {
            Discussion
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
