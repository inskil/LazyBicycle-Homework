<template>
    <div class="wrapper">
        <div class="cols">
            <div v-for="movie in movieList" v-bind:key="movie.id" class="col" ontouchstart="this.classList.toggle('hover');">
                <div class="container">
                    <div class="front" v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}">
                        <div class="inner">
                            <span><h2>{{movie.title}}</h2></span>
                            <br>
                            <h3>{{movie.directors[0].name}}</h3>
                        </div>
                    </div>
                    <div class="back" v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}">
                        <div class="inner">
                            <p>{{movie.summary}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "MovieWrapper",
        data(){
            return{}
        },
        computed: {
            ...mapGetters([
                'movieList'
            ]),
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                //this.getMovie()
            },
            // getMovie() {
            //     this.$store.dispatch('getMovieList', {
            //         //type: this.$route.params.classify,
            //         count: 8
            //     })
            //
            // },
        },
        created() {
            // Getting books data on created
            this.fetchDate()
        }


    }
</script>

<style scoped>
    @import '~@/assets/css/normalize.css';
    @import '~@/assets/css/htmleaf-demo.css';
    @import '~@/assets/css/style.css';
    .inner p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: medium;
        -webkit-line-clamp: 10;
    }
</style>
