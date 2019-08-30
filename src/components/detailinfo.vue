<template>
    <div class="body">
        <Card class="main_body">
            <div style="position: absolute; right: 1rem; top:1rem">
                <Button v-if='ismanager' type="error" ghost style="margin-right: 1rem">删除书籍</Button>
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
                <div class="maininfo" align="left" style="left: 3rem; position: relative; height: 12rem;">
                    <span class="pl">作者: {{author}}</span><br>
                    <span class="pl">出版社: {{printer}}</span><br>
                    <span class="pl">出版年: {{year}}</span><br>
                    <span class="pl">页数: {{pages}}</span><br>
                    <span class="pl">定价: {{price}}</span><br>
                    <span class="pl">ISBN: {{isbn}}</span><br>
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
                <div>
                    你的评价：
                    <Rate :value.sync="value"></Rate>
                </div>
            </div>

        </Card>

        <div class="summary_body">
            <div id="summary_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>内容简介</h2></Divider>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{summary}}</p>
            </div>
        </div>
        <div class="author_body">
            <div id="author_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>作者简介</h2></Divider>
            </div>
            <div id="author_summary">
                <p class="p2" style="text-align: left">{{author_intro}}</p>
            </div>
        </div>
        <div class="catalog_body">
            <div id="catalog_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>目录</h2></Divider>
            </div>
            <div id="catalog_summary">
                <pre class="p3" style="text-align: left">{{catalog}}</pre>
            </div>
        </div>
        <div id="review_body">
            <div id="review_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>本书评论</h2></Divider>
            </div>
            <div id="review_review">
                <div v-for="review in reviews" v-bind:key="review.id" class="review_author" align="left">
                    <span style="color: #666666">
                        {{review.author.name}} · {{review.published}}
                    </span>
                    <span style="left: 45rem; position:relative;">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </span>
                    <div class="cell_dashed">
                        <p class="review_summary">{{review.summary}}</p>
                    </div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
            <div>
                <Divider orientation="left" property="v:itemreviewed"><h2>发表评论</h2></Divider>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="width: 100%; margin-top: 1rem">
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
                formValidate:{
                    comment:''
                },
                ruleValidate:{
                    comment:[
                        { required: true, message: '评论不能为空', trigger: 'blur' },
                        { type: 'string', min: 25, message: '评论不能少于25个字', trigger: 'blur' },
                        { type: 'string', max: 1000, message: '评论不能多于1000个字', trigger: 'blur' }
                    ]
                },
                ismanager:true,
                iscollected:false,
                value: 0,
                summary_value: '',
                id: 1234567,
                title: 'balala',
                bigimg: 'https://img3.doubanio.com/view/subject/l/public/s33446751.jpg',
                author: '苏方',
                printer: '理想国丨广西师范大学出版社',
                year: '2019-8',
                pages: '296',
                price: '45.00',
                isbn: '9787559817693',
                numRaters: '23333',
                average: '8.9',
                stars: '4.45',
                summary: "12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。",
                author_intro: "卡勒德·胡赛尼（Khaled Hosseini），1965年生于阿富汗喀布尔市，后随父亲迁往美国。胡赛尼毕业于加州大学圣地亚哥医学系，现居加州。“立志拂去蒙在阿富汗普通民众面孔的尘灰，将背后灵魂的悸动展示给世人。”著有小说《追风筝的人》(The Kite Runner，2003）、《灿烂千阳》(A Thousand Splendid Suns，2007)、《群山回唱》（And the Mountains Echoed,2013）。作品全球销量超过4000万册。2006年，因其作品巨大的国际影响力，胡赛尼获得联合国人道主义奖，并受邀担任联合国难民署亲善大使。",
                catalog: "序\n第一夜\n初恋：从你的全世界路过\n1. 从你的全世界路过\n2. 猪头的爱情\n3. 初恋是一个人的兵荒马乱\n4. 反向人\n5. 河面下的少年\n6. 写在三十二岁生日\n第二夜\n表白：我希望有个如你一般的人\n1. 我希望有个如你一般的人\n2. 生鲜小龙虾的爱情\n3. 无法说出我爱你\n4. 开放在别处\n5. 最容易丢的东西\n第三夜\n执着：一路陪你笑着逃亡\n1. 最基本元素\n2. 小野狗与小蝴蝶\n3. 莫非就是这样\n4. 旅行的意义\n5. 催眠\n6. 一路陪你笑着逃亡\n第四夜\n温暖：那些细碎而美好的存在\n1. 老情书\n2. 给我的女儿梅茜，生日快乐\n3. 姐姐\n4. 吃货的战争\n5. 摆渡人\n6. 那些细碎却美好的存在\n第五夜\n争吵：有时候我们失控\n1. 青春里神一样的少年\n2. 有时候我们失控\n3. 十二星座的爱情\n4. 那个愤怒的少年\n5. 谁说女人不懂逻辑\n第六夜\n放手：我是爱情末等生\n1. 暴走萝莉的传说\n2. 我叫刘大黑\n3. 旅途需要二先生\n4. 末等生\n5. 三朵金花列传\n第七天\n怀念：青春里没有返程的旅行\n1. 骆驼的姑娘\n2. 青春里没有返程的旅行\n3. 唯一就等于没有\n4. 只有最好的爱情，没有伟大的爱情\n5. 写在三十三岁生日\n后记",
                reviews: [
                    {
                        "rating": {
                            "value": "5",
                        },
                        "votes": 4903,
                        "author": {
                            "name": "柏邦妮",
                            "id": "1207019",
                        },
                        "summary": "昨晚两点开始看《白夜行》一直看到天亮看完。展现出东野圭吾对复杂叙事的掌控能力，精彩绝伦。但是我最欣赏的还是他对恶的动机，那种孜孜不倦的探求，一直向灵魂黑洞最深处走去。他书写的恶往往不是凡俗的恶，而是一种提纯的，高智商的，有分寸的，肃穆的恶昨晚两点开始看《白夜行》一直看到天亮看完。展现出东野圭吾对复杂叙事的掌控能力，精彩绝伦。但是我最欣赏的还是他对恶的动机，那种孜孜不倦的探求，一直向灵魂黑洞最深处走去。他书写的恶往往不是凡俗的恶，而是一种提纯的，高智商的，有分寸的，肃穆的恶。...",
                        "published": "2010-12-18",
                    },
                    {
                        "rating": {
                            "value": "4",
                        },
                        "votes": 4903,
                        "author": {
                            "name": "柏邦妮",
                            "id": "1207019",
                        },
                        "summary": "昨晚两点开始看《白夜行》一直看到天亮看完。展现出东野圭吾对复杂叙事的掌控能力，精彩绝伦。但是我最欣赏的还是他对恶的动机，那种孜孜不倦的探求，一直向灵魂黑洞最深处走去。他书写的恶往往不是凡俗的恶，而是一种提纯的，高智商的，有分寸的，肃穆的恶。...",
                        "published": "2010-12-18",
                    },
                    {
                        "rating": {
                            "value": "3",
                        },
                        "votes": 4903,
                        "author": {
                            "name": "柏邦妮",
                            "id": "1207019",
                        },
                        "summary": "昨晚两点开始看《白夜行》一直看到天亮看完。展现出东野圭吾对复杂叙事的掌控能力，精彩绝伦。但是我最欣赏的还是他对恶的动机，那种孜孜不倦的探求，一直向灵魂黑洞最深处走去。他书写的恶往往不是凡俗的恶，而是一种提纯的，高智商的，有分寸的，肃穆的恶。...",
                        "published": "2010-12-18",
                    }
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
