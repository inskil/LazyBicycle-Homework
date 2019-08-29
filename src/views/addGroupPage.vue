<template>
    <div id="app">
        <add-group/>
    </div>
</template>

<script>
    import AddGroup from "@/components/AddGroup";
    export default {
        name: "AddGroupPage",
        components:{
            AddGroup
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
