<template>
    <div id="app">
        <!--group-title/-->
<!--        <group-recommender/>-->
        <group-content/>
    </div>
</template>

<script>
    import GroupContent from "@/components/GroupContent";
    //import GroupTitle from "@/components/GroupTitle";

    export default {
        name: 'groupPage',
        components: {
            // GroupRecommender,
            GroupContent,
            //GroupTitle,
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
