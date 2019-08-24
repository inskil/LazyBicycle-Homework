<template>
    <div class="carousel">
        <Carousel autoplay v-model="value2" :dots="setting.dots" :radius-dot="setting.radiusDot" loop>
            <CarouselItem v-for="book in books" v-bind:key="book.id" >
                <div class="demo-carousel" align="center">
                    <div class="material-card material-shadow-2 material-hover">
                        <img class="pic" :src="book.images.large">
                        <div class="text">
                            <h1>{{book.title}}</h1>
                            <br><br>
                            <p>{{book.summary}}</p>
                        </div>
                    </div>
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
    import '../assets/js/jquery-2.1.1.min.js';
    import '../assets/js/ripple.min.js'
    export default {
        name: "HotBooks",
        data(){
            return{
                value2: 0,
                setting:{
                    dots: 'outside',
                    radiusDot: true,
                },
                books:[
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
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
    .carousel{
        width: 80%;
        left: 10%;
        position: relative;
    }
    .material-card {
        width: 80%;
        text-align: left;
    }
    .pic{
        width: 30%;
        height: 20rem;
        object-fit: cover;
        display: block;
        float: left;
    }
    .text{
        left: 1rem;
        height: 20rem;
        padding: 2rem;
        position: relative;
    }
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: medium;
        -webkit-line-clamp: 8;
    }
</style>
