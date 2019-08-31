<template>
    <div class="carousel" style="width: 100%;max-height: 40%">
        <div class="slider slider-for">
            <div v-for="book in newbooks" v-bind:key="book.id" class="item"
                 v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}"></div>
            <div v-for="movie in newmovies" v-bind:key="movie.id" class="item"
                 v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}"></div>
        </div>
        <div class="slider slider-nav">
            <div v-for="book in newbooks" v-bind:key="book.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}">
                    <div class="number">书籍</div>
                    <div class="body">
                        <div class="location">
                            <my-rate :message=book.rating[0].average></my-rate>
                        </div>
                        <div class="headline">{{book.title}}</div>
                        <router-link :to="{name:'bookDetail'}">
                            <div class="link">更多...</div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div v-for="movie in newmovies" v-bind:key="movie.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}">
                    <div class="number">影视</div>
                    <div class="body">
                        <div class="location">
                            <myRate :message=movie.rating[0].average  />
                        </div>
                        <div class="headline">{{movie.title}}</div>
                        <router-link :to="{name:'movieDetail'}">
                            <div class="link">更多...</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import $ from 'jquery'
    import '@/assets/js/slick.min.js';
    import myRate from "@/components/myRate";

    export default {
        name: "Carousel",
        components: {
            myRate
        },
        data() {
            return {
                loading: true,
            }
        },
        computed: {
            ...mapGetters([
                'bookList',
                'movieList'
            ]),
            newbooks(){
                //console.log("newbooks" , this.bookList.slice(0,4))
                return this.bookList.slice(0,4);
            },
            newmovies(){
                // console.log("newmovies" , this.movieList.slice(0,4))
                return this.movieList.slice(0,4);
            }

        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                // this.getBook()
                // this.getMovie()
                setTimeout(this.slick,500)
            },
            getBook() {
                this.$store.dispatch('getBookList', {
                    //type: this.$route.params.classify,
                    count: 4
                })
            },
            getMovie() {
                this.$store.dispatch('getMovieList', {
                    //type: this.$route.params.classify,
                    count: 4
                })
            },
            slick() {
                $(function () {
                    console.log('````````````````start js``````````````')
                    $('.slider-for').slick({
                        slidesToShow: 1,
                        slidesToScroll: 3,
                        arrows: false,
                        fade: true,
                        asNavFor: '.slider-nav'
                    });
                    $('.slider-nav').slick({
                        slidesToScroll: 3,
                        asNavFor: '.slider-for',
                        dots: false,
                        centerMode: true,
                        focusOnSelect: true,
                        centerPadding: '60px',
                        slidesToShow: 3,
                        infinite: false,
                        prevArrow: $(".back"),
                        nextArrow: $(".forward"),
                        responsive: [{
                            breakpoint: 800,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 2
                            }
                        },
                            {
                                breakpoint: 600,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    centerPadding: '40px',
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                });
            }

        },
       created() {
            // Getting books data on created
            this.fetchDate();
        },

    }


</script>

<style scoped>
    @import '~@/assets/css/slick.min.css';
    @import '~@/assets/css/base.css';
    @import '~@/assets/css/demo.css';

    .nav-item {

    }
</style>
