<template>
    <div class="post">
        <BackTop></BackTop>
        <Card style="right: 5%; width: 25%; position: fixed">
            <div style="font-size: large; margin-top: 1rem">
                <Avatar v-bind:src="group.grouphead" size="large" shape="square"/>
                {{group.groupname}}
            </div>
            <br>
            <div class="group_text">{{group.text}}</div>
            <Divider></Divider>
            <div align="left" style="margin-bottom: 0.5rem">
                <span style="font-size: larger; vertical-align: bottom">最新讨论</span>
                <span style="vertical-align: bottom">（更多）</span>
            </div>
            <div v-for="topic in topicList" align="left">
                <Divider v-if="topic !== topicList[0]" dashed style="margin: 0.2rem"></Divider>
                {{topic.title}}（{{topic.username}}）
            </div>
        </Card>
        <Card>
            <Button v-if="isAdmin" class="delete" type="error" ghost style="float: right">删帖</Button>
            <div class="content" align="left">
                <h1>{{topicmsg.title}}</h1>
                <br>
                <Avatar v-bind:src="topicmsg.userheadimg" size="large"/>
                {{topicmsg.username}}
                <Divider type="vertical" />
                {{topicmsg.createtime}}
                <br><br>
                <div class="text">{{topicmsg.text}}</div>
            </div>
        </Card>
        <br>
        <Divider><h3>评论区</h3></Divider>
        <div v-for="review in topicmsg.review">
            <Card align="left">
                <Avatar v-bind:src="review.userheadimg"/>
                {{review.username}}
                <Divider type="vertical" />
                {{review.createtime}}
                <br>
                <div class="review_text">
                    {{review.text}}
                </div>
                <div align="right">
                    <Button type="text">回复</Button>
                </div>
                <div v-if="review.review !== undefined && review.review.length > 0" class="inner_review">
                    <br>
                    <Divider></Divider>
                    <div style="background-color: rgba(0,0,0,0.03); margin: 1rem; padding: 1rem">
                        <div v-for="inner_review in review.review">
                            <Divider v-if="inner_review !== review.review[0]"></Divider>
                            {{inner_review.username}} ：
                            {{inner_review.text}}
                        </div>
                    </div>
                </div>
            </Card>
            <br>
        </div>
        <Divider><h3>发表评论</h3></Divider>
        <Input placeholder="在这里发表你的评论..." type="textarea" :rows="5" clearable/>
        <div align="right" class="send_button">
            <Button>发送</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Discussion",
        data() {
            return{
                isAdmin:true,
                topicmsg:{
                    tid: 34919095,
                    createtime: "2012-12-07 00:12:16",
                    title: "煮字为药。",
                    text:"看到这几个字觉得很合适。\n" +
                        "悲伤的时候会写字。\n" +
                        "也会看以前自己写的字。\n" +
                        "\n" +
                        "开此贴，以为记录。\n" +
                        "煮字为药。\n" +
                        "医自己。\n" +
                        "念君安。\n" +
                        "\n" +
                        "愿你也能找到对症的药。\n" +
                        "\n" +
                        "多为摘抄，勿见怪。",
                    username:"荏苒",
                    gid:"juzimi",
                    uid:"ren_ran",
                    userheadimg:"https://img3.doubanio.com/icon/ul57495035-24.jpg",
                    review:[
                        {
                            uid:"ren_ran",
                            text:"你看到那数不清的街道吗？ \n" +
                                "如何只选择其中一条去走？ \n" +
                                "一个共度一生的女人， \n" +
                                "一栋属于自己的房子， \n" +
                                "一种生与死的方式。",
                            userheadimg:"https://img3.doubanio.com/icon/ul57495035-24.jpg",
                            username:"荏苒",
                            createtime:"2012-12-07 00:17:14",
                            review:[
                                {
                                    uid:"64813784",
                                    username:"独省",
                                    text:"1900",
                                },
                                {
                                    uid:"66470122",
                                    username:"孤独患者",
                                    text:"人活着 \n" +
                                        "也不就是为了 \n" +
                                        "这虚无飘渺的 \n" +
                                        "存在感 \n" +
                                        "感觉自己很矫情 \n" +
                                        "一行一行的",
                                }
                            ],
                        },
                        {
                            uid:"62707945",
                            text:"煮文为案，执笔为刃，剁鱼头，最喜清蒸。",
                            userheadimg:"https://img3.doubanio.com/icon/ul62707945-13.jpg",
                            username:"陈言冬",
                            createtime:"2012-12-09 00:13:21",
                            review:[
                                {
                                    uid:"ren_ran",
                                    username:"荏苒",
                                    text:"我怎么这么喜欢这句话呢。 \n" +
                                        "谢谢^_^ \n" +
                                        "祝你做个好梦〜",
                                }
                            ],
                        },
                        {
                            uid:"illusion-sys",
                            text:"煮字为药，熬文化丹。一心一意，悲无所继。",
                            userheadimg:"https://img3.doubanio.com/icon/ul42989333-254.jpg",
                            username:"YippeeH",
                            createtime:"2012-12-09 00:19:55",
                            review:[
                                {
                                    uid:"ren_ran",
                                    username:"荏苒",
                                    text:"亲们你们这让我完全接不上话呀(＞人＜;) ",
                                }
                            ],
                        },
                        {
                            uid:"66034478",
                            text:"有时候，会想要给你写封情书。贴上邮票，盖上邮戳，经邮差之手，揣着我的甜蜜与不安，寄到你的手里。尽管，你其实就在我身边。",
                            userheadimg:"https://img3.doubanio.com/icon/ul66034478-2.jpg",
                            username:"_不负相思引",
                            createtime:"2012-12-29 17:23:44",
                            review:[],
                        }
                    ],
                },
                group:{
                    groupname:"句子迷",
                    grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp",
                    gid:"juzimi",
                    text:"爱写字，爱摘抄，不爱平庸； \n" +
                        "爱阅读，爱收藏，不爱遗忘。 \n" +
                        "迷恋文字，崇尚共鸣， \n" +
                        "有那么一点点执着，有那么一点点个性， \n" +
                        "不是什么小众，也不是什么大流， \n" +
                        "我们只为那一行行跳动的文字着迷。 \n" +
                        "我们是自己精神世界的主人， \n" +
                        "我们是句子迷。 \n"
                },
                topicList:[
                    {
                        tid: 150812881,
                        title: "找一个可以互为树洞的聊友",
                        username:"孤独的地球来客",
                    },
                    {
                        tid: 34919095,
                        title: "煮字为药。",
                        username:"荏苒",
                    },
                    {
                        tid: 48515223,
                        title: "知命容易，改命难",
                        username:"守心居士",
                    },
                    {
                        tid: 147312704,
                        title: "私喜",
                        username:"我深知你是梦。",
                    },
                    {
                        tid: 150798912,
                        title: "建个楼记录一下那些戳到我心的句子",
                        username:"你的小祖宗",
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .post{
        top: 1rem;
        left: 5%;
        width: 60%;
        position: relative;
    }
    .content{
        padding: 3rem;
    }
    .text{
        font-size: large;
        white-space: pre-line;
    }
    .review_text{
        padding: 1rem;
    }
    .inner_review{
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .send_button{
        padding: 1rem;
    }
    .group_text{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 5;
        white-space: pre-line;
    }
</style>
