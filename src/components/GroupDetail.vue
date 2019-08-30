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
                                <td align="left">{{topic.title}}</td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime}}
                                    <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
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
                                <td align="left">{{topic.title}}</td>
                                <td>{{topic.username}}</td>
                                <td>{{topic.review.length}}</td>
                                <td align="right">
                                    {{topic.updatetime}}
                                    <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                                            style="height: 1.4rem;width: 1.4rem"></Button>
                                </td>
                            </tr>
                        </table>
                    </TabPane>
                </Tabs>
                <Button v-if="isMember" type="primary" ghost
                        style="float: right; top:0rem; right:1rem; position:absolute;">+发言
                </Button>
            </div>
        </div>
        <div class="right_div" align="left">
            <h2 style="float: left">管理员</h2>
            <Button v-if="isMember && !isAdmin" style="float:right;" type="text">申请管理员</Button>
            <br>
            <Row style="margin-top: 1rem">
                <Col span="6" v-for="admin in group.admin">
                    <div align="center">
                        <Avatar v-bind:src="admin.userheadimg" size="large"/>
                        <br>
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
                        <Avatar v-bind:src="user.userheadimg" size="large"/>
                        <br>
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
                        <Avatar v-bind:src="group.grouphead" size="large" shape="square"/>
                        <br>
                        {{group.groupname}}
                    </div>
                </Col>
            </Row>
            <div style="float: left;width: 10%;height: 100%; margin-top: 10%">
                <div v-if='ismanager'>
                    <Button type="primary">删除该小组</Button>
                </div>
                <div v-else>
                    <Button type="primary" disabled>删除该小组</Button>
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
                isMember: true,
                isAdmin: true,
            }
        },
        computed: {
            ...mapGetters([
                'groupList',
                'topicList'
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
            recommendList:function () {
                return this.groupList
            }
        },
        methods: {
            sortKeyNum(array, key) {
                return array.sort(function (a, b) {
                    var x = a[key].length;
                    var y = b[key].length;
                    return y - x
                })
            },
            updatePage: function () {
                const {fullPath} = this.$route
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
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
        }
        ,
        created() {
            // Getting books data on created
            this.getGroup()
            this.getTopic()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'updateAll'
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
</style>
