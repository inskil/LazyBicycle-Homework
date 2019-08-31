<template>
    <div class="carousel">
        <Carousel autoplay v-model="value2" :dots="setting.dots" :radius-dot="setting.radiusDot" loop>
            <CarouselItem v-for="book in bookList" v-bind:key="book.id">
                <div class="demo-carousel" align="center">
                    <router-link :to="'/bookDetail/'+book.id">
                        <div class="material-card material-shadow-2 material-hover">
                            <img class="pic" :src="book.images[0].large">
                            <div class="text">
                                <h1>{{book.title}}</h1>
                                <br><br>
                                <p id="pp">{{book.summary}}</p>
                            </div>
                        </div>
                    </router-link >
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "HotBooks",
        data() {
            return {
                loading: false,
                value2: 0,
                setting: {
                    dots: 'outside',
                    radiusDot: true,
                },
                //bookList:[]

            }
        },
        computed: {
            ...mapGetters([
                'bookList'
            ]),
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                const {fullPath} = this.$route
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
            },
            getBook() {
                this.loading = true
                this.$store.dispatch('getBookList', {
                    //type: this.$route.params.classify,
                })
            },
        },
        created() {
            // Getting books data on created
            this.getBook()
        },

    }
</script>

<style scoped>
    .carousel {
        width: 80%;
        left: 10%;
        position: relative;
    }

    .material-card {
        width: 80%;
        text-align: left;
    }

    .pic {
        width: 30%;
        height: 20rem;
        object-fit: cover;
        display: block;
        float: left;
    }

    .text {
        left: 1rem;
        height: 20rem;
        padding: 2rem;
        position: relative;
        color: black;
    }

    p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: medium;
        -webkit-line-clamp: 8;
    }
</style>
