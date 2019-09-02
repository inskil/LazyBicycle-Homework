<template>
    <div class="carousel">
        <Carousel autoplay v-model="value2" :dots="setting.dots" :radius-dot="setting.radiusDot" loop>
            <CarouselItem v-for="book in newmovies" v-bind:key="book.id">
                <div class="demo-carousel" align="center">
                    <router-link :to="'/movieDetail/'+book.id">
                        <div class="material-card material-shadow-2 material-hover">
                            <img class="pic" :src="book.images[0].large">
                            <div class="text">
                                <h1>{{book.title}}</h1>
                                <br>
                                <p>{{book.summary}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "HotMovies",
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
                'movieList'
            ]),
            newmovies(){
                // console.log("newmovies" , this.movieList.slice(0,4))
                return this.movieList.slice(0,8);
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                console.log("feching````````````````````")
                this.getMovie()
                setTimeout(this.fix, 1000)
            },
            getMovie() {
                this.$store.dispatch('getMovieList', {
                    //type: this.$route.params.classify,
                    count: 8
                })
            },
            // fix() {
            //     $(function () {
            //         console.log("rending......................")
            //         $(".material-ripple").click(function (a) {
            //             var i = $(this);
            //             0 == i.find(".material-ink").length && i.prepend("<div class='material-ink'></div>");
            //             var t = i.find(".material-ink");
            //             if (t.removeClass("animate"), !t.height() && !t.width()) {
            //                 var e = Math.max(i.outerWidth(), i.outerHeight());
            //                 t.css({height: e, width: e})
            //             }
            //             var r = a.pageX - i.offset().left - t.width() / 2,
            //                 h = a.pageY - i.offset().top - t.height() / 2,
            //                 l = i.data("ripple-color");
            //             t.css({top: h + "px", left: r + "px", background: l}).addClass("animate")
            //         });
            //     });
            // }
        },
        created() {
            // Getting books data on created
            // this.fetchDate()
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
        font-size: small;
        -webkit-line-clamp: 8;
    }

    h1{
        margin: auto;
    }
</style>
