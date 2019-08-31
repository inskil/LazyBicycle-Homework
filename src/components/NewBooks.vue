<template>
    <Row class="book_list" justify="center" type="flex">
        <Col v-for="book in bookList" v-bind:key="book.id" span="6" class="book_col" align="center">
            <router-link :to="'/bookDetail/'+book.id">
                <div class="book_card material-card material-shadow-5 material-hover">
                    <img class="pic" :src="book.images[0].large">
                </div>
            </router-link>
            <h3>{{book.title}}</h3>
            <my-rate :message=book.rating[0].average></my-rate>
            {{book.rating[0].average}}
            <br>
            {{book.author[0]}}
        </Col>
    </Row>
</template>

<script>
    import myRate from "@/components/myRate";
    import {mapGetters} from 'vuex'

    export default {
        name: "NewBooks",
        components: {
            myRate
        },
        data() {
            return {
                loading: false,
                value2: 0,
                setting: {
                    dots: 'outside',
                    radiusDot: true,
                },
                sta: 0
                //bookList:[]

            }
        },
        computed: {
            ...mapGetters([
                'bookList'
            ])
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'fetchData'
        },
        methods: {
            fetchDate: function () {
                this.getBook()
            },
            getBook() {
                this.$store.dispatch('getBookList', {
                    //type: this.$route.params.classify,
                    count: 8
                })
            },
        },
        created() {
            // Getting books data on created
            this.fetchDate()
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/ripple.min.css";

    .book_list {
        width: 80%;
        left: 10%;
        position: relative;
    }

    .book_card {
        width: 8rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .material-card {
        width: 10rem;
        min-height: 13rem;
        text-align: left;
    }

    .pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
</style>
