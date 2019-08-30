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
            <table style="left: 20%; width:80%; position: absolute">
                <tr v-for="book in books" v-bind:key="book.id" style="padding: 1rem">
                    <th align="left" style="font-weight: normal; width: 60%; border-bottom: dashed 1px #5cadff">
                        <h3>[图书] {{book.title}}</h3>
                        <div>
                            <div class="author">作者：{{book.author}}</div>
                            <div class="rate">评分：</div>
                            <Rate disabled allow-half v-model="book.rating.average" style="bottom: 0.5rem; position: relative"/>
                        </div>
                        <div class="summary">{{book.summary}}</div>
                    </th>
                    <th><div class="pic_div material-card material-shadow-2 material-hover"><img class="pic" :src="book.images.large"></div></th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    //import '@/assets/js/jquery-2.1.1.min.js';
    import '@/assets/js/ripple.min.js'
    export default {
        name: "SearchResult",
        data(){
            return{
                key:"",
                books,
                alllist:[],
                books:[
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770782",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770783",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770784",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770785",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770786",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770787",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770788",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        },
                        rating:{
                            average:"4.6"
                        },
                        id:"1770789",
                        author:"[美] 卡勒德·胡赛尼",
                        summary:"12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n" +
                            "成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n" +
                            "故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。"
                    },
                ]
            }
        },
        methods:{
            uodate(){
                this,=
            }
        },
        created() {
            this.getlist()
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
        -webkit-line-clamp: 4;
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
</style>
