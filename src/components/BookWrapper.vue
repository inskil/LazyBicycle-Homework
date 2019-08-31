<template>
    <div class="wrapper">
        <div class="cols">
            <div v-for="book in newbooks"   v-bind:key="book.id" class="col"
                 ontouchstart="this.classList.toggle('hover');">
                <router-link :to="'/bookDetail/'+book.id">
                    <div class="container">
                        <div class="front" v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}">
                            <div class="inner">
                                <span><h2>{{book.title}}</h2></span>
                                <br>
                                <h3>{{book.author[0]}}</h3>
                            </div>
                        </div>
                        <div class="back" v-bind:style="{backgroundImage:'url(' + book.images[0].large + ')'}">
                            <div class="inner">
                                <p>{{book.summary}}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "BookWrapper",
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'bookList'
            ]),
            newbooks(){
                console.log("bookwapper")
                return this.bookList.slice(0,8);
            },
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                //this.getBook()
            },
            // getBook() {
            //     this.$store.dispatch('getBookList', {
            //         //type: this.$route.params.classify,
            //         count: 8
            //     })

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

    .inner p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: medium;
        -webkit-line-clamp: 10;
    }
</style>
