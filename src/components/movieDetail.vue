<template>
    <div class="body">
        <Card class="main_body">
            <div style="position: absolute; right: 1rem; top:1rem">
                <Button v-if='ismanager' type="error" ghost style="margin-right: 1rem">删除电影</Button>
                <i-button v-if="!iscollected" @click="heart_success" icon="md-heart-outline">收藏</i-button>
                <i-button v-else @click="heart_cancel" icon="md-heart" type="primary" ghost>已收藏</i-button>
            </div>
            <div class="headtitle">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">{{title}}</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div class="infomations">
                <div id="mainpic">
                    <a class="nbg" v-bind:href="bigimg"
                       v-bind:title="title">
                        <img v-bind:src="bigimg" v-bind:alt="title" rel="v:photo"
                             style="width: 135px;max-height: 200px;">
                    </a>
                </div>
                <div class="maininfo" align="left" style="left: 3rem; height: 12rem; padding-top: 2rem; position: relative;">
                    <span class="pl">原名: {{original_title}}</span><br>
                    <span class="pl">导演: {{directors.name}}</span><br>
                    <span class="pl">上映时间: {{year}}</span><br>
                    <span class="pl">电影时长: {{durations}}</span><br>
                </div>
            </div>
            <div class="votes">
                <div>
                    <span class="rl">评分<br> <strong>{{average}}</strong></span><br>
                </div>
                <div>
                    <Rate disabled allow-half v-model="stars" />
                    <br>
                </div>
                <div>
                    <span class="rl">评价人数: {{numRaters}}</span>
                </div>
            </div>

        </Card>

        <div class="summary_body">
            <div id="summary_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>剧情简介</h2></Divider>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{summary}}</p>
            </div>
        </div>
        <div id="review_body">
            <div id="review_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>热门评论</h2></Divider>
            </div>
            <div id="review_review">
                <div v-for="review in reviews" v-bind:key="review.id" class="review_author" align="left">
                    <span style="color: #666666">
                        {{review.author.name}} · {{review.created_at}}
                    </span>
                    <span style="right: 18%; position:absolute;">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </span>
                    <div class="cell_dashed">
                        <p class="review_summary">{{review.content}}</p>
                    </div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
            <div>
                <Divider orientation="left" property="v:itemreviewed"><h2>发表评论</h2></Divider>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="width: 100%; margin-top: 1rem">
                <FormItem prop="value" style="width: 20%; left: 40%; position: relative">
                    <Rate :value.sync="value" style="font-size: xx-large"></Rate>
                </FormItem>
                <FormItem prop="comment">
                    <Input v-model="formValidate.comment" type="textarea" :rows="5" placeholder="在这里发表你的评论" />
                </FormItem>
                <FormItem class="review_buttom" align="right" style="position: relative; right: 1rem">
                    <Button @click="handleSubmit('formValidate')" icon="md-send">发送</Button>
                </FormItem>
            </Form>
        </div>
        <Back-top></Back-top>
    </div>

</template>

<script>
    export default {
        name: "detailinfo",
        data() {
            return {
                formValidate: {
                    comment: '',
                    value:''
                },
                ruleValidate: {
                    comment: [
                        {required: true, message: '评论不能为空', trigger: 'blur'},
                        {type: 'string', min: 25, message: '评论不能少于25个字', trigger: 'blur'},
                        {type: 'string', max: 1000, message: '评论不能多于1000个字', trigger: 'blur'}
                    ],
                    value: [
                        {required: true, message: '评分不能为空', trigger: 'blur'}
                    ]
                },
                ismanager:true,
                iscollected:false,
                value: 0,
                summary_value: '',
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('评价发表成功');
                        this.summary_value = this.formValidate.comment;
                    } else {
                        this.$Message.error('评价发表失败');
                    }
                })
            },
            heart_success() {
                this.iscollected=true;
                this.$Message.success('收藏成功');
            },
            heart_cancel() {
                this.iscollected=false;
                this.$Message.success('收藏取消');
            },
        }
    }


</script>

<style scoped>
    @import "../assets/css/infos.css";

</style>
