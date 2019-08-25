<template>
    <div id="app">
        <hot-books/>
        <h1><br>新书速递</h1>
        <new-books/>
        <h1><br>好书推荐</h1>
        <new-books/>
    </div>
</template>

<script>
    import HotBooks from "@/components/HotBooks";
    import NewBooks from "@/components/NewBooks";
    export default {
        name: 'bookPage',
        components: {
            HotBooks,
            NewBooks
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
