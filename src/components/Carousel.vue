<template>
    <div class="carousel" style="width: 100%;max-height: 40%">
        <div class="slider slider-for">
            <div v-for="book in bookList" v-bind:key="book.id" class="item"
                 v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}"></div>
            <div v-for="movie in movieList" v-bind:key="movie.id" class="item"
                 v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}"></div>
        </div>
        <div class="slider slider-nav">
            <div v-for="book in bookList" v-bind:key="book.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}">
                    <div class="number">书籍</div>
                    <div class="body">
                        <div class="location">
                            <Rate disabled allow-half v-model="book.rating.average"/>
                        </div>
                        <div class="headline">{{book.title}}</div>
                        <a href="#0">
                            <div class="link">更多...</div>
                        </a>
                    </div>
                </div>
            </div>

            <div v-for="movie in movieList" v-bind:key="movie.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + movie.images[0].large + ')'}">
                    <div class="number">影视</div>
                    <div class="body">
                        <div class="location">
                            <Rate disabled allow-half v-model="movie.rating.average"/>
                        </div>
                        <div class="headline">{{movie.title}}</div>
                        <a href="#0">
                            <div class="link">更多...</div>
                        </a>
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

    export default {
        name: "Carousel",
        data() {
            return {
                loading: false,
                //bookList:[]
            }
        },
        computed: {
            ...mapGetters([
                'bookList',
                'movieList'
            ]),
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                this.getBook()
                this.getMovie()
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
            this.fetchDate()
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
