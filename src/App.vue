<template>
    <div id="app">
        <guide-bar/>
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
    import GuideBar from "@/components/GuideBar.vue"

    export default {
        name: 'app',
        provide(){
            reload: this.reload()
        },
        data(){
            return{
                isRouterAlive :true
            }
        },
        components: {
            GuideBar,
        },
        methods: {
            updatePage: function () {
                const {fullPath} = this.$route
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
            },
            getALL() {
                this.$store.dispatch('getBookList')
                this.$store.dispatch('getMovieList')
                this.$store.dispatch('getTopicList')
                this.$store.dispatch('getGroupList')
            },
            updateAll() {
                this.getAll()
                this.updatePage()
            },
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                    console.log('reload')
                })
            }
        },
        created() {
            // Getting books data on created
            this.getALL()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'updateAll'
        },
    }
</script>

<style scoped>
    /*#app {*/
    /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*  -webkit-font-smoothing: antialiased;*/
    /*  -moz-osx-font-smoothing: grayscale;*/
    /*  text-align: center;*/
    /*  color: #2c3e50;*/
    /*}*/
</style>

