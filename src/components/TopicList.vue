<template>
    <table class="topicList">
        <tr>
            <td align="left" style="width: 50%; padding-left: 1rem">讨论</td>
            <td style="width: 15%">作者</td>
            <td style="width: 10%">回应</td>
            <td align="right" style="width: 25%; padding-right: 1rem">最后回应</td>
        </tr>
        <tr v-for="topic in newList" v-if="topic.istop">
            <td align="left"><img src="https://img3.doubanio.com/pics/stick.gif">{{topic.title}}</td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime}}
                <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small" style="height: 1.4rem;width: 1.4rem"></Button>
            </td>
        </tr>
        <tr v-for="topic in newList" v-if="!topic.istop">
            <td align="left">{{topic.title}}</td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime}}
                <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small" style="height: 1.4rem;width: 1.4rem"></Button>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "TopicList",
        props:{
            isAdmin:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
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
                ]
            }
        },
        computed:{
            newList:function () {
                return this.sortKey(this.topicList,'updatetime');
            }
        },
        methods:{
            sortKey(array,key){
                return array.sort(function(a,b){
                    var x = a[key];
                    var y = b[key];
                    return ((x<y)?1:(x>y)?-1:0)
                })
            }
        }
    }
</script>

<style scoped>
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
