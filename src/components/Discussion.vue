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
            <div v-for="topic in topiclist_gid" align="left">
                <Divider v-if="topic !== topicList[0]" dashed style="margin: 0.2rem"></Divider>
                <router-link  :to="'/topic/'+topic.gid+'/'+topic.tid">{{topic.title}}（{{topic.username}}）</router-link>
            </div>
        </Card>
        <Card>
            <Button v-if="isAdmin" type="error" ghost style="float: right" icon="ios-trash" @click="delete_success">删帖</Button>
            <Button v-if="isAdmin&&!topicmsg.isgood" type="error" ghost style="float: right; margin-right: 1rem" icon="ios-arrow-dropup" @click="good_success">置顶</Button>
            <Button v-if="isAdmin&&topicmsg.isgood" type="error" ghost style="float: right; margin-right: 1rem" icon="ios-arrow-dropup-circle" @click="good_cancel">取消置顶</Button>
            <Button v-if="isAdmin&&!topicmsg.istop" type="error" ghost style="float: right; margin-right: 1rem" icon="ios-star-outline" @click="top_success">加精</Button>
            <Button v-if="isAdmin&&topicmsg.istop" type="error" ghost style="float: right; margin-right: 1rem" icon="ios-star" @click="top_cancel">取消精品</Button>
            <div class="content" align="left">
                <h1>{{topicmsg.title}}</h1>
                <br>
                <Avatar v-bind:src="topicmsg.userheadimg" size="large"/>
                {{topicmsg.username}}
                <Divider type="vertical"/>
                {{topicmsg.createtime  | parseTime}}
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
                <Divider type="vertical"/>
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
    import {mapGetters} from "vuex";

    export default {
        name: "Discussion",
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'groupList',
                'topicList',
                'userinfo'
            ]),
            gid(){
                return this.$route.params.gid
            },
            tid(){
                return this.$route.params.tid
            },
            isAdmin: function () {
                for (let use in this.group.admin) {
                    if (use.uid == this.$store.state.uid) return true
                }
                return false
            },
            topicmsg(){
                let topic = this.topicList.filter(item => item.tid == this.tid)
                return topic[0]
            },
            group: function () {
                let groups = this.groupList.filter(item => item.gid == this.gid)
                return groups[0]
            },
            topiclist_gid: function () {
                return this.topicList.filter(item => item.gid == this.gid)
            },
        },
        inject:['reload'],
        methods:{
            load(){
                this.reload()
            }
        },
        watch:{
            '$route': 'load'
        },
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
