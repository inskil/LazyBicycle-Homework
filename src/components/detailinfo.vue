<template>
    <div class="body">
        <div class="headtitle">
            <h1 style="text-align: left">
                <span property="v:itemreviewed">{{title}}</span>
                <div class="clear"></div>
            </h1>
        </div>
        <div class="main_body">
            <div class="infomations">
                <div id="mainpic">
                    <a class="nbg" v-bind:href="bigimg"
                       v-bind:title="title">
                        <img v-bind:src="bigimg" v-bind:alt="title" rel="v:photo"
                             style="width: 135px;max-height: 200px;">
                    </a>
                </div>
                <div id="maininfo">
                    <span class="pl">作者: {{author}}</span><br>
                    <span class="pl">出版社: {{printer}}</span><br>
                    <span class="pl">出版年: {{year}}</span><br>
                    <span class="pl">页数: {{pages}}</span><br>
                    <span class="pl">定价: {{price}}</span><br>
                    <span class="pl">ISBN: {{isbn}}</span><br>
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
                    <span class="rl">评价人数: {{numRaters}}</span>
                </div>
            </div>
            <div class="related_info">
            </div>
        </div>
        <div style="height: 50px"></div>
        <div class="summary_body">
            <div id="summary_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">内容简介  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{summary}}</p>
            </div>
        </div>
        <div style="height: 50px"></div>
        <div class="author_body">
            <div id="author_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">作者简介  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div id="author_summary">
                <p class="p2" style="text-align: left">{{author_intro}}</p>
            </div>
        </div>
        <div style="height: 50px"></div>
        <div class="catalog_body">
            <div id="catalog_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">目录  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
                <div class="intro-content " ref="desc">
                    <div class="merchant-desc" style="text-align: left" v-if="introduce">
                        <div id="catalog_summary">
                            <pre class="p3" style="text-align: left">{{catalog}}</pre>
                        </div>
                    </div>
                    <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
                        <p>{{exchangeButton ? '展开' : '收起'}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 50px"></div>
        <div id="review_body">
            <div id="review_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">本书评论  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div style="height: 20px; width: 100%"></div>
            <div id="review_review">
                <div v-for="review in reviews" id="review_author">
                    <div style="width: 70%;float: left;height: 25px">
                        <p class="p4" style="text-align: left; color: #666666">{{review.author.name}} ·
                            {{review.published}} </p>
                    </div>
                    <div style="width: 30%;float: right; height: 25px">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </div>

                    <div>
                        <p class="p2" style="text-align: left">{{review.summary}}</p>
                    </div>
                    <div><p class="p4" style="width:100%; text-align: right;float: right;height: 30px">
                        {{review.votes}}人认为有用</p></div>
                    <div class="cell_dashed"></div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
        </div>
        <div style="height: 50px"></div>
    </div>
</template>

<script>
    export default {
        name: "detailinfo",
        data() {
            return {
                title: '演示展开收起',
                introduce: '',
                // 是否展示所有文本内容
                showTotal: true,
                // 显示展开还是收起
                exchangeButton: true,
                // 是否显示展开收起按钮
                showExchangeButton: false,
                rem: '',
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
        mounted() {
            this.init();
        },
        methods: {
            showTotalIntro() {
                console.log(this.showTotal);
                this.showTotal = !this.showTotal;
                this.exchangeButton = !this.exchangeButton;
            }
            ,
            getRem() {
                console.log('getRem');
                const defaultRem = 16;
                let winWidth = window.innerWidth;
                console.log('winWidth:' + winWidth);
                let rem = winWidth / 375 * defaultRem;
                return rem;
            }
            ,
            init() {
                this.introduce = false;
            }
            ,
            tryLong() {
                let longIntroduce = this.catalog;
                if (this.introduce !== longIntroduce) {
                    this.showExchangeButton = false;
                    this.showTotal = true;
                    this.introduce = longIntroduce;
                }
            }
            ,
            tryShort() {
                let shortIntroduce = this.catalog;
                if (this.introduce !== shortIntroduce) {
                    this.showExchangeButton = false;
                    this.showTotal = true;
                    this.introduce = shortIntroduce;
                }
            }
        },
        watch: {
            'introduce': function () {
                this.$nextTick(function () {
                    console.log('nextTick');
// 判断介绍是否超过四行
                    let rem = parseFloat(this.getRem());
                    console.log('watch 中的rem', rem);
                    if (!this.$refs.desc) {
                        console.log('desc null');
                        return;
                    }
                    let descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '');
                    console.log('descHeight:' + descHeight);
                    console.log('如果 descHeight 超过' + (5.25 * rem) + '就要显示展开按钮');
                    if (descHeight > 5.25 * rem) {
                        console.log('超过了四行');
// 显示展开收起按钮
                        this.showExchangeButton = true;
                        this.exchangeButton = true;
// 不是显示所有
                        this.showTotal = false;
                    } else {
// 不显示展开收起按钮
                        this.showExchangeButton = false;
// 没有超过四行就显示所有
                        this.showTotal = true;
                        console.log('showExchangeButton', this.showExchangeButton);
                        console.log('showTotal', this.showTotal);
                    }
                }.bind(this));
            }
        }
    }
    ;
</script>

<style lang="less" scoped rel="stylesheet/less">
    @import "../assets/css/infos.css";

    .p3 {
        font: 14px Arial;
        line-height: 150%;
        height: 440px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .top-prove {
        height: 100px;
        width: 100%;
        background: #dddddd;
        text-align: center;
        line-height: 100px;
    }

    .total-introduce {
        height: auto;
        overflow: hidden;
        font-size: 14px;
        color: #434343;
        margin: 10px;

        .intro-content {
            .merchant-desc {
                width: 100%;
                line-height: 21px;
            }
        }

        .unfold {
            display: block;
            z-index: 11;
            float: right;
            width: 40px;
            height: 21px;

            p {
                margin: 0;
                line-height: 21px;
                color: #7fbe87;
            }
        }
    }

    .detailed-introduce {
        font-size: 14px;
        color: #434343;
        position: relative;
        overflow: hidden;
        margin: 10px;

        .intro-content {
            // 最大高度设为4倍的行间距
            max-height: 84px;
            line-height: 21px;
            word-wrap: break-word;
            /*强制打散字符*/
            word-break: break-all;
            background: #ffffff;
            /*同背景色*/
            color: #ffffff;
            overflow: hidden;

            .merchant-desc {
                width: 100%;
                line-height: 21px;
            }

            &:after,
                // 这是展开前实际显示的内容
            &:before {
                content: attr(title);
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                color: #434343
                // overflow: hidden;
            }

            // 把最后最后一行自身的上面三行遮住
            &:before {
                display: block;
                overflow: hidden;
                z-index: 1;
                max-height: 63px;
                background: #ffffff;
            }

            &:after {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 81px;
                /*截取行数*/
                -webkit-line-clamp: 4;
                text-overflow: ellipsis;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
                text-indent: -12em;
                /*尾部留空字符数*/
                padding-right: 4em;
            }

            .unfold {
                z-index: 11;
                width: 40px;
                height: 21px;
                outline: 0;
                position: absolute;
                right: 0;
                bottom: 0;

                p {
                    margin: 0;
                    line-height: 21px;
                    color: #7fbe87;
                }
            }
        }
    }

    .bottom-prove {
        height: 100px;
        width: 100%;
        background: #dddddd;
        text-align: center;
        line-height: 100px;
    }

    .change-buttom {
        font-size: 14px;
        color: #2371be;

        .long {
            text-align: 21px;
            text-align: center;
            height: 21px;
        }

        .short {
            text-align: 21px;
            text-align: center;
            height: 20px;
        }
    }
</style>
