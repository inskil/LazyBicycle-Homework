<template>
    <div id="app">
        <group-detail/>
    </div>
</template>

<script>
    import GroupDetail from "../components/GroupDetail";
    export default {
        name: "groupDetailPage",
        components:{
            GroupDetail
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
