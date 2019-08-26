<template>
    <div id="app">
        <register/>
    </div>
</template>

<script>
    import register from "@/components/register";
    export default {
        name: "registerPage",
        components: {
            register
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
