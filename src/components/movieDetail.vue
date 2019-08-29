<template>
    <div class="body">
        <div class="headtitle">
            <h1 style="text-align: left">
                <span property="v:itemreviewed">{{title}}</span>
                <div class="clear"></div>
            </h1>
        </div>
        <div class="main_body; width: 100%">
            <div class="infomations">
                <div id="mainpic">
                    <a class="nbg" v-bind:href="bigimg"
                       v-bind:title="title">
                        <img v-bind:src="bigimg" v-bind:alt="title" rel="v:photo"
                             style="width: 135px;max-height: 200px;">
                    </a>
                </div>
                <div id="maininfo">
                    <span class="pl">原名: {{original_title}}</span><br>
                    <span class="pl">导演: {{directors.name}}</span><br>
                    <span class="pl">上映时间: {{year}}</span><br>
                    <span class="pl">电影时长: {{durations}}</span><br>
                </div>
            </div>
            <div id="little_margin"></div>
            <div id="votes">
                <div>
                    <span class="rl">评分:<br> <strong>{{average}}</strong></span><br>
                </div>
                <div>
                    <Rate disabled allow-half v-model="stars"/>
                    <br>
                </div>
                <div>
                    <span class="rl">评价人数: {{collect_count}}</span>
                </div>
            </div>
            <div class="related_info">
            </div>
        </div>
        <div style="height: 50px; width:100%"></div>
        <div style="height: 70px;width: 100%;">
            <div style="float: left;width: 15%;height: 100%">
                你的评价：
                <Rate :value.sync="value"></Rate>
            </div>
            <div style="float: right;width: 5%;height: 100%">
                <i-button @click="heart_success(true)" icon="ios-heart">收藏</i-button>
            </div>
            <div style="float: right;width: 10%;height: 100%">
                <div v-if='ismanager'><Button type="primary">删除电影</Button></div>
                <div v-else><Button type="primary" disabled>删除电影</Button></div>
            </div>
        </div>


        <div class="summary_body">
            <div id="summary_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">剧情简介  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{summary}}</p>
            </div>
        </div>
        <div style="height: 50px"></div>

        <div style="height: 50px"></div>
        <div id="review_body">
            <div id="review_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">热门评论  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div style="height: 20px; width: 100%"></div>
            <div id="review_review">
                <div v-for="review in reviews" v-bind:key="review" id="review_author">
                    <div style="width: 70%;float: left;height: 25px">
                        <p class="p4" style="text-align: left; color: #666666">{{review.author.name}} ·
                            {{review.created_at}} </p>
                    </div>
                    <div style="width: 30%;float: right; height: 25px">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </div>

                    <div>
                        <p class="p2" style="text-align: left">{{review.content}}</p>
                    </div>
                    <div><p class="p4" style="width:100%; text-align: right;float: right;height: 30px">
                        {{review.useful_count}}人认为有用</p></div>
                    <div class="cell_dashed"></div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
            <div id="review_new" style="width: 100%;">
                <div id="review_kuang" style="width: 79%; float:left">
                    <Input v-model="summary_value" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                           placeholder="Enter something..."/>
                </div>
                <div id="review_buttom" style="width: 20%;float: right">
                    <div style="float:top;height:40px"></div>
                    <div style="float:left;">
                        <i-button @click="review_success(true)">发表评论</i-button>
                    </div>
                </div>
            </div>

        </div>
        <div style="height: 200px"></div>
        <Back-top></Back-top>
    </div>

</template>

<script>


    export default {

        name: "movieDetail",

        data() {
            return {
                ismanager:true,
                value: 0,
                summary_value: "",

                id: 1292052,
                title: 'balala',
                bigimg: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                directors:
                    {
                        name: "弗兰克·德拉邦特",
                        name_en : "Frank Darabont",
                    }
                ,
                year: '1994',
                durations: "142分钟",
                collect_count: '2066787',
                original_title: "The Shawshank Redemption",
                average: '9.7',
                stars: '4.85',
                summary: "20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步…… ",
                reviews: [
                    {
                        "rating": {
                            "value": "5",
                        },
                        "useful_count": 13251,
                        "author": {
                            "name": "犀牛",
                            "id": "1041052",
                        },
                        "content": "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”",
                        "created_at": "2005-10-28 00:28:07",
                    },
                    {
                        "rating": {
                            "value": "5",
                        },
                        "useful_count": 13251,
                        "author": {
                            "name": "犀牛",
                            "id": "1041052",
                        },
                        "content": "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”",
                        "created_at": "2005-10-28 00:28:07",
                    },
                    {
                        "rating": {
                            "value": "5",
                        },
                        "useful_count": 13251,
                        "author": {
                            "name": "犀牛",
                            "id": "1041052",
                        },
                        "content": "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”",
                        "created_at": "2005-10-28 00:28:07",
                    },
                    {
                        "rating": {
                            "value": "5",
                        },
                        "useful_count": 13251,
                        "author": {
                            "name": "犀牛",
                            "id": "1041052",
                        },
                        "content": "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”",
                        "created_at": "2005-10-28 00:28:07",
                    },
                ]
            }
        },
        methods: {
            review_success(nodesc) {
                this.$Notice.success({
                    title: '评价发表成功',
                    desc: nodesc ? '' : ''
                });
                this.summary_value = ""
            },
            heart_success(nodesc) {
                this.$Notice.success({
                    title: '收藏成功',
                    desc: nodesc ? '' : ''
                });
            },
        }
    }


</script>

<style scoped>
    @import "../assets/css/infos.css";

</style>
