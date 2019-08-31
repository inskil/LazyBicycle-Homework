<template>
    <div class="primary_div">
        <BackTop></BackTop>
        <div class="left_div">
            <div>
                <Avatar v-bind:src="group.grouphead" size="large" shape="square" style="float: left"/>
                <h1 style="float: left">{{group.groupname}}</h1>
                <div v-if="isMember && !isAdmin" align="right">
                    我是这个小组的成员>
                    <Button @click="quitgroup" type="text">退出小组</Button>
                </div>
                <div v-if="isAdmin" align="right">
                    我是这个小组的管理员>
                    <Button @click="quitgroup" type="text">退出小组</Button>
                </div>
                <div v-if="!isMember" align="right">
                    我还不是这个小组的成员>
                    <Button @click="jiongroup" type="text">加入小组</Button>
                </div>
            </div>
            <Divider></Divider>
            <div class="group_info" align="left">
                <div>创建于{{group.createtime | parseTime}}&emsp;组长：{{group.creator.username}}</div>
                {{group.text}}
            </div>
            <Divider></Divider>
            <div style="position: relative">
                <Tabs>
                    <TabPane label="最近讨论" name="name1">
                        <topic-list v-bind:isAdmin="isAdmin" v-bind:get_gid="this.gid"/>
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
                                <td align="left"><router-link class="link" :to="'/topic/'+topic.gid+'/'+topic.tid">{{topic.title}}</router-link></td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime | parseTime}}
                                    <Button @click.native="deltopic(topic.tid)" v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                                            style="height: 1.4rem;width: 1.4rem"></Button>
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
                            <tr v-for="topic in topiclist_gid" v-if="topic.isgood">
                                <td align="left"><router-link class="link" :to="'/topic/'+topic.gid+'/'+topic.tid">{{topic.title}}</router-link></td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime | parseTime}}
                                    <Button @click.native="deltopic(topic.tid)"  v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                                            style="height: 1.4rem;width: 1.4rem"></Button>
                                </td>
                            </tr>
                        </table>
                    </TabPane>
                </Tabs>
                <Button @click="addtopic" v-if="isMember" type="primary" ghost
                        style="float: right; top:0rem; right:1rem; position:absolute;">+发言
                </Button>
            </div>
        </div>
        <div class="right_div" align="left">
            <h2 style="float: left">管理员</h2>
            <Button v-if="isMember && !isAdmin" @click="becomeAdmin" style="float:right;" type="text">申请管理员</Button>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="admin in group.admin">
                    <div align="center">
                        <Avatar v-bind:src="admin.userheadimg" size="large"/>
                        <br>
                        <div class="name">{{admin.username}}</div>
                    </div>
                </Col>
            </Row>
            <Divider></Divider>
            <h2 style="float: left">小组成员</h2>
            <Button @click="jiongroup" v-if="!isMember" style="float:right;" type="text">加入小组</Button>
            <Button @click="quitgroup" v-else style="float: right;" type="text">退出小组</Button>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="user in group.user">
                    <div align="center">
                        <Avatar v-bind:src="user.userheadimg" size="large"/>
                        <br>
                        <div class="name">{{user.username}}</div>
                    </div>
                </Col>
            </Row>
            <Divider></Divider>
            <h2 style="float: left">小组推荐</h2>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="group in recommendList">
                    <router-link :to="'/groupDetail/'+group.gid" class="link">
                        <div align="center">
                            <Avatar v-bind:src="group.grouphead" size="large" shape="square"/>
                            <br>
                            <div class="name">{{group.groupname}}</div>
                        </div>
                    </router-link>
                </Col>
            </Row>
            <div v-if='isAdmin' style="float: left;width: 10%;height: 100%; margin-top: 10%">
                <div v-if='isAdmin'>
                    <Button @click="delgroup" type="primary">删除该小组</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopicList from "./TopicList";
    import {mapGetters} from "vuex";
    import group from "../store/modules/group";

    export default {
        name: "GroupDetail",
        components: {
            TopicList,
        },
        data() {
            return {
                ismanager: false,
                isAdmin: false,
                isMember: false,
            }
        },
        computed: {
            ...mapGetters([
                'groupList',
                'topicList',
                'userinfo'
            ]),
            hotList: function () {
                return this.sortKeyNum(this.topiclist_gid, 'review');
            },
            group: function () {
                let groups = this.groupList.filter(item => item.gid == this.gid)
                return groups[0]
            },
            gid: function () {
                return this.$route.params.id
            },
            topiclist_gid: function () {
                return this.topicList.filter(item => item.gid == this.gid)
            },
            recommendList: function () {
                return this.groupList
            }
        },
        inject: ['reload'],
        methods: {
            sortKeyNum(array, key) {
                return array.sort(function (a, b) {
                    var x = a[key].length;
                    var y = b[key].length;
                    return y - x
                })
            },
            updatePage: function () {
                // this.reload()
                this.updateuserrole()
            }
            ,
            updateAll() {
                this.getGroup()
                this.getTopic()
                this.updatePage()
            }
            ,
            getGroup() {
                this.loading = true
                this.$store.dispatch('getGroupList')
                this.loading = false
            },
            getTopic() {
                this.loading = true
                this.$store.dispatch('getTopicList')
                this.loading = false
            },
            delgroup() {
                console.log('delllllllllllllll')
                this.$store.dispatch('delGroup', {uid: this.userinfo.uid, gid: this.gid})
                this.$router.push('/')
            },
            addtopic() {
                this.$router.push('/submitpost/' + this.gid)
            },
            async jiongroup() {
                let data = {
                    gid: this.gid,
                    user: {
                        username: this.userinfo.username,
                        userheadimg: this.userinfo.userheadimg,
                        uid: this.userinfo.uid
                    }
                }
                await this.$axios.post('/joingroup', data).then(res => {
                    console.log(res)
                    this.$Message.success('加入成功!');
                    this.updatePage()
                }).catch(err => {
                    console.log(err)
                })
            },
            async quitgroup() {
                let data = {
                    gid: this.gid,
                    uid: this.userinfo.uid
                }
                await this.$axios.post('/quitgroup', data).then(res => {
                    console.log(res)
                    this.$Message.success('退出成功!');
                    this.updatePage()
                }).catch(err => {
                    console.log(err)
                })
            },
            async deltopic(tid){
                console.log('delllllllllll')
                let data = {
                    gid: this.gid,
                    uid: this.userinfo.uid,
                    tid:tid
                }
                 await  this.$axios.post('/removeTopic', data).then(res => {
                    console.log(res)
                    this.$Message.success('删除成功!');
                    this.updatePage()
                }).catch(err => {
                    console.log(err)
                })
            },
            updateuserrole() {
                if (this.group) {
                    console.log('sssssssssssssssssssssssssssssss')
                    console.log('sssssssssssssssssssssssssssssss', this.group.admin[0].username)
                    for (let i = 0; i < this.group.admin.length; i++) {
                        if (this.group.admin[i].username == this.userinfo.username) this.isAdmin = true
                    }
                    for (let i = 0; i < this.group.user.length; i++) {
                        if (this.group.user[i].username == this.userinfo.username) this.isMember = true
                    }
                }
            },
            async becomeAdmin() {
                console.log('bbbbbbbbbbbbbbbb')
                let data = {
                    gid: this.gid,
                    uid: this.userinfo.uid,
                    username: this.userinfo.username,
                    userheadimg: this.userinfo.userheadimg
                }
                await this.$axios.post('/notice/newapply', data).then(res => {
                    console.log(res)
                    this.$Message.success('申请成功！请耐心等待。!');
                    this.updatePage()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            setTimeout(this.updateuserrole(), 1000)
            //     // Getting books data on created
            //     this.getGroup()
            //     this.getTopic()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'updateAll',
            group: function () {
                this.updateuserrole()
            }
        },
    }
</script>

<style scoped>
    .primary_div {
        top: 1rem;
        position: relative;
    }

    .left_div {
        left: 5%;
        width: 60%;
        position: relative;
        padding: 2rem;
        float: left;
    }

    .right_div {
        right: 5%;
        width: 30%;
        position: absolute;
        padding: 2rem;
        margin-top: 5rem;
    }

    .group_info {
        padding: 1rem;
        background-color: rgba(173, 198, 255, 0.28);
        white-space: pre-line;
        font-size: larger;
    }

    .topicList {
        word-wrap: break-word;
        word-break: break-word;
        width: 100%;
        font-size: larger;
    }

    td {
        border-bottom: 1px dashed #DDDDDD;
        padding: 0.3rem;
    }

    .name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 1rem;
    }

    .link{
        color: black;
    }

    .link:hover{
        color: #2b85e4;
    }
</style>
