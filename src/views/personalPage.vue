<template>
    <div id="app">
        <mine/>
    </div>
</template>

<script>
    import Mine from "@/components/Mine";
    export default {
        name: "personalPage",
        components: {
            Mine
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
