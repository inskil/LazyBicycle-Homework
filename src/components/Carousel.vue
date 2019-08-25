<template>
    <div class="carousel" style="width: 100%">
        <div class="slider slider-for">
            <div v-for="book in books" v-bind:key="book.id" class="item" v-bind:style="{backgroundImage:'url(' + book.images.large + ')'}"></div>
            <div v-for="movie in movies" v-bind:key="movie.id" class="item" v-bind:style="{backgroundImage:'url(' + movie.images.large + ')'}"></div>
        </div>
        <div class="slider slider-nav">
            <div v-for="book in books" v-bind:key="book.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + book.images.large + ')'}">
                    <div class="number">书籍</div>
                    <div class="body">
                        <div class="location"><Rate disabled allow-half v-model="book.rating.average"/></div>
                        <div class="headline">{{book.title}}</div>
                        <a href="#0">
                            <div class="link">了解更多...</div>
                        </a>
                    </div>
                </div>
            </div>
            <div v-for="movie in movies" v-bind:key="movie.id" class="nav-item">
                <div class="content" v-bind:style="{backgroundImage:'url(' + movie.images.large + ')'}">
                    <div class="number">影视</div>
                    <div class="body">
                        <div class="location"><Rate disabled allow-half v-model="movie.rating.average"/></div>
                        <div class="headline">{{movie.title}}</div>
                        <a href="#0">
                            <div class="link">了解更多...</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/js/jquery-2.1.1.min.js';
    import '../assets/js/demo.js'
    import '../assets/js/slick.min.js'
    export default {
        name: "Carousel",
        data(){
            return{
                books:[
                    {
                        title:"追风筝的人",
                        rating:{
                            average:"4.45"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        id:"1770782"
                    },
                    {
                        title:"小王子",
                        rating:{
                            average:"4.6"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s3294754.jpg"
                        },
                        id:"1003078"
                    },
                    {
                        title:"从你的全世界路过",
                        rating:{
                            average:"4.6"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s27102925.jpg"
                        },
                        id:"25747921"
                    }
                ],
                movies:[
                    {
                        title:"肖申克的救赎",
                        rating:{
                            average:"4.85"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"
                        },
                        id:"1292052"
                    },
                    {
                        title:"霸王别姬",
                        rating:{
                            average:"4.8"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        },
                        id:"1291546"
                    },
                    {
                        title:"这个杀手不太冷",
                        rating:{
                            average:"4.7"
                        },
                        images:{
                            large:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg"
                        },
                        id:"1295644"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/base.css';
    @import '../assets/css/slick.min.css';
    @import '../assets/css/demo.css';
</style>
