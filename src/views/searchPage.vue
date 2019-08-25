<template>
    <div id="app">
        <search-box/>
        <div>
            <search-menu style="float: left; width: 12rem"/>
            <search-result style="left: 15rem; position: absolute"/>
        </div>
    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    import SearchMenu from "@/components/SearchMenu";
    import SearchResult from "@/components/SearchResult";
    export default {
        name: "searchPage",
        components: {
            SearchBox,
            SearchMenu,
            SearchResult
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
