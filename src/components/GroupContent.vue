<template>
    <div class="wrapper">
        <div class="content">
            <h1>
                <div class="head-nav" style="padding-left: 150px ">
                    <span class="head-title" style="margin-top:10%">讨论精选</span>
                    <p></p>
                </div>
            </h1>
            <div class="grid-16-8 clearfix">
                <Col span="12" offset="2">
                    <div class="article">
                        <!--讨论精选-->
                        <div class="" v-for="article in hotTopicList" v-bind:key="article.title">
                            <div class="channel-item">
                                <div class="likes">{{article.review.length}}<br>喜欢</div>
                                <div class="bd">
                                    <h3><router-link :to="tid_url(article.gid,article.tid)" >{{article.title}}</router-link></h3>
                                    <router-link :to="tid_url(article.gid,article.tid)" >
                                    <div class="block">
                                        <div class="pic">
                                            <div class="pic-wrap">
                                                <img v-bind:src="article.userheadimg">
                                            </div>
                                        </div>
                                        <p>{{article.text}}</p>
                                    </div>
                                    </router-link>
                                    <div class="source">
                                        <span class="from">来自{{article.username}}</span>
                                        <span class="pubtime">{{article.createtime}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span="8">
                    <!--小组排行-->
                    <div class="aside">
                        <div id="dale_group_explore_top_right" ad-status="loaded"></div>
                        <div class="mod channel-group-rec">
                            <div class="hd">
                                <h2>热门小组排行</h2>
                            </div>
                            <div class="bd" v-for="group in groupList" v-bind:key="group.groupname">
                                <ul>
                                    <li class="">
                                        <div class="pic">
                                            <router-link :to="gid_url(group.gid)"><img
                                                    v-bind:src="group.grouphead"></router-link>
                                        </div>
                                        <div class="info">
                                            <div class="title">
                                                <router-link :to="gid_url(group.gid)" >{{group.groupname}}</router-link>
                                            </div>
                                            <span class="num">{{group.usercount}}个有为小青年</span>
                                            <span class="join">{{group.tid.length}}篇有趣帖子</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "GroupContent",
        data() {
            return {
                url: '/',
            }
        },
        computed: {
            ...mapGetters([
                'topicList',
                'groupList',
                'hotTopicList',
            ]),
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'updateAll'
        },
        methods: {
            gid_url(id) {
                return "/groupDetail/" + id
            },
            tid_url(gid,tid) {
                return "topic/" +gid +'/' + tid
            },
            StringLenFix: function (text) {
                return text.slice(0, 14)
            },
            updatePage: function () {
                const {fullPath} = this.$route
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
            }
            ,
            updateAll() {
                this.getTopic()
                this.updatePage()
            }
            ,
            getTopic() {
                this.loading = true
                this.$store.dispatch('getTopicList')
                this.loading = false
            },
        },
        created() {
            // Getting books data on created
            this.getTopic()
        }
    }
</script>

<style scoped>
    @import '../assets/css/6361ae61fa71bf01.css';

    .wrapper {
        text-align: left;
        background-color: white;
        width: 100%;
        height: 100%;
    }

    .aside {
        position: relative;
        left: 101px;
    }
</style>