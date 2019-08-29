<template>
    <div class="primary_div">
        <BackTop></BackTop>
        <div class="left_div">
            <div>
                <Avatar v-bind:src="group.grouphead" size="large" shape="square" style="float: left"/>
                <h1 style="float: left">{{group.groupname}}</h1>
                <div v-if="isMember && !isAdmin" align="right">
                    我是这个小组的成员>
                    <Button type="text">退出小组</Button>
                </div>
                <div v-if="isAdmin" align="right">
                    我是这个小组的管理员>
                    <Button type="text">退出小组</Button>
                </div>
                <div v-if="!isMember" align="right">
                    我还不是这个小组的成员>
                    <Button type="text">加入小组</Button>
                </div>
            </div>
            <Divider></Divider>
            <div class="group_info" align="left">
                <div>创建于{{group.createtime}}&emsp;组长：{{group.creator.username}}</div>
                {{group.text}}
            </div>
            <Divider></Divider>
            <div style="position: relative">
                <Tabs>
                    <TabPane label="最近讨论" name="name1">
                        <topic-list v-bind:isAdmin="isAdmin"/>
                    </TabPane>
                    <TabPane label="最热讨论" name="name2">
                        <table class="topicList">
                            <tr>
                                <td align="left" style="width: 50%; padding-left: 1rem">讨论</td>
                                <td style="width: 15%">作者</td>
                                <td style="width: 10%">回应</td>
                                <td align="right" style="width: 25%; padding-right: 1rem">最后回应</td>
                            </tr>
                            <tr v-for="topic in hotList">
                                <td align="left">{{topic.title}}</td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime}}
                                    <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small" style="height: 1.4rem;width: 1.4rem"></Button>
                                </td>
                            </tr>
                        </table>
                    </TabPane>
                    <TabPane label="精华讨论" name="name3">
                        <table class="topicList">
                            <tr>
                                <td align="left" style="width: 50%; padding-left: 1rem">讨论</td>
                                <td style="width: 15%">作者</td>
                                <td style="width: 10%">回应</td>
                                <td align="right" style="width: 25%; padding-right: 1rem">最后回应</td>
                            </tr>
                            <tr v-for="topic in topicList" v-if="topic.isgood">
                                <td align="left">{{topic.title}}</td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime}}
                                    <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small" style="height: 1.4rem;width: 1.4rem"></Button>
                                </td>
                            </tr>
                        </table>
                    </TabPane>
                </Tabs>
                <Button v-if="isMember" type="primary" ghost style="float: right; top:0rem; right:1rem; position:absolute;">+发言</Button>
            </div>
        </div>
        <div class="right_div" align="left">
            <h2 style="float: left">管理员</h2>
            <Button v-if="isMember && !isAdmin" style="float:right;" type="text">申请管理员</Button>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="admin in group.admin">
                    <div align="center">
                        <Avatar v-bind:src="admin.userheadimg" size="large"/><br>
                        {{admin.username}}
                    </div>
                </Col>
            </Row>
            <Divider></Divider>
            <h2 style="float: left">小组成员</h2>
            <Button v-if="!isMember" style="float:right;" type="text">加入小组</Button>
            <Button v-else style="float: right;" type="text">退出小组</Button>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="user in group.user">
                    <div align="center">
                        <Avatar v-bind:src="user.userheadimg" size="large"/><br>
                        {{user.username}}
                    </div>
                </Col>
            </Row>
            <Divider></Divider>
            <h2 style="float: left">小组推荐</h2>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="group in recommendList">
                    <div align="center">
                        <Avatar v-bind:src="group.grouphead" size="large" shape="square"/><br>
                        {{group.groupname}}
                    </div>
                </Col>
            </Row>
            <div style="float: left;width: 10%;height: 100%; margin-top: 10%">
                <div v-if='ismanager'><Button type="primary">删除该小组</Button></div>
                <div v-else><Button type="primary" disabled>删除该小组</Button></div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopicList from "./TopicList";
    export default {
        name: "GroupDetail",
        components:{
            TopicList,
        },
        data(){
            return{
                ismanager:true,
                isMember:true,
                isAdmin:true,
                group:{
                    groupname : "自然笔记",
                    grouphead : "https://images.weserv.nl/?url=https://img3.doubanio.com/view/group/sqxs/public/5f2304f2028fabd.webp",
                    gid : 15354,
                    text : "花鸟鱼虫，山川树木，天文地理，古往今来——自然之大，无所不容；自然之奇，鬼斧神工；自然之美，瑰丽壮观。\r\n\r\n我们是一个热爱自然的群体。每到周末或节假日，我们就到大自然中旅行，或观察、考察沿途的动植物，或背上地质锤登到没有人烟的山头敲打石头。一切动力，来自于我们对大自然的好奇与痴迷。\r\n\r\n我们用脚步、文笔、照片记录亲身经历的大自然，共同交流对她的发现和理解。\r\n\r\n如果您是自然、博物爱好者，是户外旅行爱好者，是摄影爱好者，欢迎加入到我们这个群体中来，分享探索和知识的乐趣！玩，也是一门大学问。\r\n\r\n【愿望】\r\n\r\n秉承博物精神，开创科学新风。通过理论知识与实践活动的紧密结合，为认识和理解自然文化开辟新途径。知行合一是我们的原则。\r\n\r\n【博物学】\r\n\r\n在一篇书评中看到的，借来分享\r\n\r\n　　博物学是指对大自然宏观层面的观察、记录、分类等。\r\n　　博物学强调知识、情感和价值观的“三合一”，强调鉴赏性、体验性。\r\n　　博物学提倡亲自实践，尊重荒野，要时常感受荒野。\r\n　　博物学强调与自然共生，尊重大自然。",
                    createtime : "2008-12-03",
                    usercount : 2,
                    user : [{
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    }, {
                        uid : 20002,
                        username : "嘿你好",
                        userheadimg : "https://img3.doubanio.com/icon/u187725837-1.jpg"
                    },{
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    }, {
                        uid : 20002,
                        username : "嘿你好",
                        userheadimg : "https://img3.doubanio.com/icon/u187725837-1.jpg"
                    },{
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    }, {
                        uid : 20002,
                        username : "嘿你好",
                        userheadimg : "https://img3.doubanio.com/icon/u187725837-1.jpg"
                    },{
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    }, {
                        uid : 20002,
                        username : "嘿你好",
                        userheadimg : "https://img3.doubanio.com/icon/u187725837-1.jpg"
                    },{
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    }, {
                        uid : 20002,
                        username : "嘿你好",
                        userheadimg : "https://img3.doubanio.com/icon/u187725837-1.jpg"
                    }
                    ],
                    admin : [
                        {
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                        },
                        {
                            uid : 20001,
                            username : "马二",
                            userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                        },
                        {
                            uid : 20001,
                            username : "马二",
                            userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                        },
                        {
                            uid : 20001,
                            username : "马二",
                            userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                        },
                        {
                            uid : 20001,
                            username : "马二",
                            userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                        }
                    ],
                    creator : {
                        uid : 20001,
                        username : "马二",
                        userheadimg : "https://img3.doubanio.com/icon/u2538103-16.jpg"
                    },
                    topicmax : 2,
                    tid : [15354001, 15354002, 15354003]

                },
                topicList: [
                    {
                        tid : 15354002,
                        createtime : "2010-08-23 21:59:27",
                        title : "新人报道贴",
                        text : "此帖专为大家熟悉你而设。来吧，说几句。",
                        gid : 15354,
                        uid : 20004,
                        username : "空错",
                        userheadimg : "https://img1.doubanio.com/icon/u1708520-8.jpg",
                        istop:true,
                        isgood:true,
                        updatetime:'2010-09-10 09:32:51',
                        review : [{
                            uid : 20005,
                            username : "大波波喵",
                            userheadimg : "https://img3.doubanio.com/icon/u1814680-62.jpg",
                            text : "我前几天收获了一些飞燕草种子。春天刚发芽的时候，被我妈当杂草拔掉了，不然会有很多的。明年培育多一些再分给大家啊。",
                            createtime : "2010-08-24 09:19:05",
                            review : []
                        }, {
                            uid : 20007,
                            username : "韦栋梁",
                            userheadimg : "https://img3.doubanio.com/icon/u1195014-4.jpg",
                            text : "我也来报道。",
                            createtime : "2010-09-10 09:32:51",
                            review : []
                        }]
                    },
                    {
                        tid : 15354002,
                        createtime : "2010-08-23 21:59:27",
                        title : "新人报道贴",
                        text : "此帖专为大家熟悉你而设。来吧，说几句。",
                        gid : 15354,
                        uid : 20004,
                        username : "空错",
                        userheadimg : "https://img1.doubanio.com/icon/u1708520-8.jpg",
                        istop:true,
                        isgood:false,
                        updatetime:'2010-09-10 09:40:51',
                        review : [{
                            uid : 20005,
                            username : "大波波喵",
                            userheadimg : "https://img3.doubanio.com/icon/u1814680-62.jpg",
                            text : "我前几天收获了一些飞燕草种子。春天刚发芽的时候，被我妈当杂草拔掉了，不然会有很多的。明年培育多一些再分给大家啊。",
                            createtime : "2010-08-24 09:19:05",
                            review : []
                        }, {
                            uid : 20007,
                            username : "韦栋梁",
                            userheadimg : "https://img3.doubanio.com/icon/u1195014-4.jpg",
                            text : "我也来报道。",
                            createtime : "2010-09-10 09:40:51",
                            review : []
                        }, {
                            uid : 20007,
                            username : "韦栋梁",
                            userheadimg : "https://img3.doubanio.com/icon/u1195014-4.jpg",
                            text : "我也来报道。",
                            createtime : "2010-09-10 09:40:51",
                            review : []
                        }]
                    },
                    {
                        tid : 15354002,
                        createtime : "2010-08-23 21:59:27",
                        title : "新人报道贴",
                        text : "此帖专为大家熟悉你而设。来吧，说几句。",
                        gid : 15354,
                        uid : 20004,
                        username : "空错",
                        userheadimg : "https://img1.doubanio.com/icon/u1708520-8.jpg",
                        istop:false,
                        isgood:true,
                        updatetime:'2010-09-10 10:32:51',
                        review : [{
                            uid : 20005,
                            username : "大波波喵",
                            userheadimg : "https://img3.doubanio.com/icon/u1814680-62.jpg",
                            text : "我前几天收获了一些飞燕草种子。春天刚发芽的时候，被我妈当杂草拔掉了，不然会有很多的。明年培育多一些再分给大家啊。",
                            createtime : "2010-08-24 09:19:05",
                            review : []
                        }, {
                            uid : 20007,
                            username : "韦栋梁",
                            userheadimg : "https://img3.doubanio.com/icon/u1195014-4.jpg",
                            text : "我也来报道。",
                            createtime : "2010-09-10 10:32:51",
                            review : []
                        }]
                    },
                    {
                        tid : 15354002,
                        createtime : "2010-08-23 21:59:27",
                        title : "新人报道贴",
                        text : "此帖专为大家熟悉你而设。来吧，说几句。",
                        gid : 15354,
                        uid : 20004,
                        username : "空错",
                        userheadimg : "https://img1.doubanio.com/icon/u1708520-8.jpg",
                        istop:false,
                        isgood:false,
                        updatetime:'2010-09-10 12:32:51',
                        review : [{
                            uid : 20007,
                            username : "韦栋梁",
                            userheadimg : "https://img3.doubanio.com/icon/u1195014-4.jpg",
                            text : "我也来报道。",
                            createtime : "2010-09-11 12:32:51",
                            review : []
                        }]
                    },
                    {
                        tid : 15354002,
                        createtime : "2010-08-23 21:59:27",
                        title : "新人报道贴",
                        text : "此帖专为大家熟悉你而设。来吧，说几句。",
                        gid : 15354,
                        uid : 20004,
                        username : "空错",
                        userheadimg : "https://img1.doubanio.com/icon/u1708520-8.jpg",
                        istop:false,
                        isgood:false,
                        updatetime:'2010-08-23 21:59:27',
                        review : []
                    }
                ],
                recommendList:[
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp",
                        gid:"juzimi"
                    },
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp",
                        gid:"juzimi"
                    },
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp",
                        gid:"juzimi"
                    },
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp",
                        gid:"juzimi"
                    }
                ]
            }
        },
        computed:{
            hotList:function () {
                return this.sortKeyNum(this.topicList,'review');
            }
        },
        methods:{
            sortKeyNum(array,key){
                return this.topicList.sort(function(a,b){
                    var x = a[key].length;
                    var y = b[key].length;
                    return y-x
                })
            },
        }
    }
</script>

<style scoped>
    .primary_div{
        top: 1rem;
        position: relative;
    }
    .left_div{
        left: 5%;
        width: 60%;
        position: relative;
        padding: 2rem;
        float: left;
    }
    .right_div{
        right: 5%;
        width: 30%;
        position: absolute;
        padding: 2rem;
        margin-top: 5rem;
    }
    .group_info{
        padding: 1rem;
        background-color: rgba(173, 198, 255, 0.28);
        white-space: pre-line;
        font-size: larger;
    }
    .topicList{
        word-wrap: break-word;
        word-break: break-word;
        width: 100%;
        font-size: larger;
    }
    td{
        border-bottom: 1px dashed #DDDDDD;
        padding: 0.3rem;
    }
</style>
