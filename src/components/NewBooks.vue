<template>
    <Row class="book_list" justify="center" type="flex">
        <Col v-for="book in books" v-bind:key="book.id" span="6" class="book_col" align="center">
            <div class="book_card material-card material-shadow-5 material-hover">
                <img class="pic" :src="book.images.large">
            </div>
            <h3>{{book.title}}</h3>
            <Rate disabled allow-half v-model="book.rating.average"/> {{book.rating.average}}
            <br>
            {{book.author}}
        </Col>
    </Row>
</template>

<script>
    import '../assets/js/jquery-2.1.1.min.js';
    import '../assets/js/ripple.min.js'
    export default {
        name: "NewBooks",
        data(){
            return{
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
        }
    }
</script>

<style scoped>
    @import "../assets/css/ripple.min.css";
    .book_list{
        width: 80%;
        left: 10%;
        position: relative;
    }
    .book_card{
        width: 8rem;
    }
    img{
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
    .pic{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
</style>
