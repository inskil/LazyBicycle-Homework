<template>
    <div>
        <div class="search d6">
            <form>
                <input type="text" placeholder="搜索你感兴趣的书籍、影视和小组...">
                <button type="submit"></button>
            </form>
        </div>
        <div>
            <Menu active-name="all" style="float: left; width: 15%">
                <MenuItem name="all" class="search-menu"><Icon type="ios-paper" />全部</MenuItem>
                <MenuItem name="book" class="search-menu"><Icon type="ios-book" />书籍</MenuItem>
                <MenuItem name="movie" class="search-menu"><Icon type="ios-film" />影视</MenuItem>
                <MenuItem name="group" class="search-menu"><Icon type="ios-people" />小组</MenuItem>
                <MenuItem name="discussion" class="search-menu"><Icon type="ios-text" />讨论</MenuItem>
            </Menu>
            <table style="left: 20%; width:70%; position: absolute; font-size: larger">
                <tr v-for="book in alllist.book" v-bind:key="book._id" style="padding: 1rem">
                    <th align="left" style="font-weight: normal; width: 80%; border-bottom: dashed 1px #5cadff; padding: 1rem 1rem 1rem 0rem">
                        <h3>[图书] {{book.title}}</h3>
                        <div>
                            <div class="author">作者：{{book.author[0]}}</div>
                            <div class="rate">评分：</div>
                            <Rate disabled allow-half v-model="book.rating[0].star" style="bottom: 0.5rem; position: relative"/>
                        </div>
                        <div class="summary">{{book.summary}}</div>
                    </th>
                    <th style="border-bottom: dashed 1px #5cadff">
                        <div class="pic_div material-card material-shadow-2 material-hover">
                            <img class="pic" :src="book.images[0].large">
                        </div>
                    </th>
                </tr>
                <tr v-for="book in alllist.movie" v-bind:key="book._id" style="padding: 1rem">
                    <th align="left" style="font-weight: normal; width: 80%; border-bottom: dashed 1px #5cadff; padding: 1rem 1rem 1rem 0rem">
                        <h3>[电影] {{book.title}}</h3>
                        <div>
                            <div class="author">导演：{{book.directors[0].name}}</div>
                            <div class="rate">评分：</div>
                            <Rate disabled allow-half v-model="book.rating[0].star" style="bottom: 0.5rem; position: relative"/>
                        </div>
                        <div class="summary">{{book.summary}}</div>
                    </th>
                    <th style="border-bottom: dashed 1px #5cadff">
                        <div class="pic_div material-card material-shadow-2 material-hover">
                            <img class="pic" :src="book.images[0].large">
                        </div>
                    </th>
                </tr>
                <tr v-for="book in alllist.topic" v-bind:key="book._id" style="padding: 1rem">
                    <th align="left" style="font-weight: normal; width: 60%; border-bottom: dashed 1px #5cadff; padding: 1rem 1rem 1rem 0rem" colspan="2">
                        <h3>[话题] {{book.title}}</h3>
                        <div>
                            <div class="author">作者：{{book.username}}</div>
                        </div>
                        <div class="summary2">{{book.text}}</div>
                    </th>
                </tr>
                <tr v-for="book in alllist.group" v-bind:key="book._id" style="padding: 1rem">
                    <th align="left" style="font-weight: normal; width: 60%; border-bottom: dashed 1px #5cadff; padding: 1rem 1rem 1rem 0rem" colspan="2">
                        <h3>[小组] {{book.groupname}}</h3>

                        <div class="summary2">{{book.text}}</div>
                    </th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from '../utils/fetch'
    //import '@/assets/js/jquery-2.1.1.min.js';
    import '@/assets/js/ripple.min.js'
    export default {
        name: "SearchResult",
        data() {
            return {
                key: "",
                alllist: {
                    book: [],
                    movie: [],
                    topic: [],
                    group: [],
                },
            }
        },
        methods: {
            getlist() {
                console.log("------------------------getlist-----------------------")
                const _this = this;
                var pa = {
                    title: this.key,
                };
                axios.get("/search", pa).then(function (result) {
                    //成功
                    _this.$Message.success('搜索成功!');
                    console.log("result is " , result.data)
                    _this.alllist = result.data;
                    for(var i = 0; i < _this.alllist.book.length;i++){
                        _this.alllist.book[i].rating[0].star = _this.alllist.book[i].rating[0].average/2;
                    }
                    for(i = 0; i < _this.alllist.movie.length;i++){
                        _this.alllist.movie[i].rating[0].star = _this.alllist.movie[i].rating[0].average/2;
                    }
                }).catch(function (error) {
                    //失败
                    this.$Message.error(error);
                })

            }
        },
        created() {
            this.getlist();
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/ripple.min.css";
    @import '~@/assets/css/search-style.css';
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
    .author{
        float:left;
        bottom: 0;
        padding: 0;
        position: relative;
        width: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 1;
    }
    .rate{
        float: left;
        position: relative;
    }
    .summary{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 3;
    }
    .pic{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .pic_div{
        width: 5rem;
        height: 7rem;
        left: 20%;
        position: relative;
    }
    .summary2{
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 3;
    }
</style>
