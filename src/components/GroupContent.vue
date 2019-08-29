<template>
    <div class="wrapper">
        <div class="content">
            <h1>
                <div class="head-nav" style="padding-left: 150px ">
                    <span class="head-title" style="margin-top:10%">讨论精选</span>
                    <p></p>
                </div>
            </h1>
            <div class="grid-16-8 clearfix">
                <Col span="12" offset="2">
                    <div class="article">
                        <!--讨论精选-->
                        <div class="" v-for="article in articles" v-bind:key="article.title">
                            <div class="channel-item">
                                <div class="likes">{{article.like}}<br>喜欢</div>
                                <div class="bd">
                                    <h3><a href="https://www.douban.com/group/topic/149297974/">{{article.title}}</a></h3>
                                    <div class="block">
                                        <div class="pic">
                                            <div class="pic-wrap">
                                                <img v-bind:src="article.images.large">
                                            </div>
                                        </div>
                                        <p>{{article.summary}}</p>
                                    </div>
                                    <div class="source">
                                        <span class="from">来自<a href="https://www.douban.com/group/blabla/">{{article.comefrom}}</a></span>
                                        <span class="pubtime">{{article.time}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--页数-->
                        <!--div class="paginator">
                            <span class="prev">
                                &lt;前页
                            </span>
                            <span class="thispage" data-total-page="336">1</span>
                            <a href="?start=30">2</a>
                            <a href="?start=60">3</a>
                            <a href="?start=90">4</a>
                            <a href="?start=120">5</a>
                            <a href="?start=150">6</a>
                            <a href="?start=180">7</a>
                            <a href="?start=210">8</a>
                            <a href="?start=240">9</a>
                            <span class="break">...</span>
                            <a href="?start=10020">335</a>
                            <a href="?start=10050">336</a>
                            <span class="next">
                            <link rel="next" href="?start=30">
                            <a href="?start=30">后页&gt;</a>
                        </span>
                        </div-->
                    </div>
                </Col>
                <Col span="8">
                    <!--小组排行-->
                    <div class="aside">
                        <div id="dale_group_explore_top_right" ad-status="loaded"></div>
                        <div class="mod channel-group-rec">
                            <div class="hd">
                                <h2>热门小组排行</h2>
                            </div>
                            <div class="bd" v-for="group in groups" v-bind:key="group.title">
                                <ul>
                                    <li class="">
                                        <div class="pic">
                                            <a href="https://www.douban.com/group/230893/"><img v-bind:src="group.images.large" class=""></a>
                                        </div>
                                        <div class="info">
                                            <div class="title">
                                                <a href="https://www.douban.com/group/230893/" class="">{{group.title}}</a>
                                            </div>
                                            <span class="num">{{group.pernum}}个有为小青年</span>
                                            <span class="join">{{group.postnum}}篇有趣帖子</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                     </div>
                </Col>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GroupContent",
        data(){
            return{
                groups:[
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },{
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },{
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    },
                    {
                        title:"吃喝在武汉",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        pernum:"38263",
                        postnum:"2593",
                    }
                ],
                articles:[
                    {
                        like:"590",
                        title:"只有雪山荒漠羊群的冬日青海",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img1.doubanio.com/view/group_topic/small/public/p200063059.webp"
                        },
                        comefrom:"鹅组小组",
                        time:"昨天02:11",
                        summary:"没有油菜花和人潮的淡季青海，可能才是真正意义上的青海。面对壮阔的美景，有时候连相机都来不及拿出。包车路线西宁青海湖茶卡盐湖祁连山脉.还有哦我是一月底去的，冬季不建议自驾，冰雪..."
                    },{
                        like:"590",
                        title:"只有雪山荒漠羊群的冬日青海",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img1.doubanio.com/view/group_topic/small/public/p200063059.webp"
                        },
                        comefrom:"鹅组小组",
                        time:"昨天02:11",
                        summary:"没有油菜花和人潮的淡季青海，可能才是真正意义上的青海。面对壮阔的美景，有时候连相机都来不及拿出。包车路线西宁青海湖茶卡盐湖祁连山脉.还有哦我是一月底去的，冬季不建议自驾，冰雪..."
                    },{
                        like:"590",
                        title:"只有雪山荒漠羊群的冬日青海",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img1.doubanio.com/view/group_topic/small/public/p200063059.webp"
                        },
                        comefrom:"鹅组小组",
                        time:"昨天02:11",
                        summary:"没有油菜花和人潮的淡季青海，可能才是真正意义上的青海。面对壮阔的美景，有时候连相机都来不及拿出。包车路线西宁青海湖茶卡盐湖祁连山脉.还有哦我是一月底去的，冬季不建议自驾，冰雪..."
                    },{
                        like:"590",
                        title:"只有雪山荒漠羊群的冬日青海",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img1.doubanio.com/view/group_topic/small/public/p200063059.webp"
                        },
                        comefrom:"鹅组小组",
                        time:"昨天02:11",
                        summary:"没有油菜花和人潮的淡季青海，可能才是真正意义上的青海。面对壮阔的美景，有时候连相机都来不及拿出。包车路线西宁青海湖茶卡盐湖祁连山脉.还有哦我是一月底去的，冬季不建议自驾，冰雪..."
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/6361ae61fa71bf01.css';

    .wrapper{
        text-align:left;
        background-color:white;
        width: 100%;
        height: 100%;
    }
    .aside{
        position:relative;
        left: 101px;
    }
</style>