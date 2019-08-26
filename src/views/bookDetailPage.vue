<template>
    <div id="app">
        <detail-info/>
    </div>
</template>

<script>
    import detailInfo from "@/components/detailinfo";

    export default {
        name: 'bookDetailPage',
        components: {
            detailInfo,
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