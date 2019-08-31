<template>
    <div class="r-top-sec">

        <!--推荐小组标题-->
        <h1 style="text-align: left ">
            <div class="head-nav" style="padding-left: 150px">
                <span class="head-title" style="margin-top:10%">推荐小组</span>
                <router-link to="/addGroup">
                    <Button type="primary" style="margin-right:60rem ;float: right ">创建一个新的小组</Button>
                </router-link>

            </div>
        </h1>
        <div class="forum_recommend" alog-alias="forum_recommend" style="background-color: #f5ece0">
            <div class="day_rcmd clearfix" id="day_rcmd" alog-group="day_rcmd">
                <span class="class_title" style="margin-top: 15px">最热小组</span>
                <div class="rcmd_forum_list" style=" width: 340px" v-for="flower in flowers"
                     v-bind:key="flower.groupname">
                    <div class="rcmd_forum clearfix" style="padding-right: 0px">
                        <router-link rel="noopener" :to="gid_url(flower.gid)" target="_blank" class="rcmd_forum_img">
                            <img v-bind:src="flower.grouphead" width="95" height="95">
                        </router-link>
                        <div class="rcmd_forum_desc" style="width: 220px">
                            <p class="rcmd_f_name">
                                <router-link rel="noopener" :to="gid_url(flower.gid)" target="_blank">
                                    {{flower.groupname}}
                                </router-link>
                            </p>
                            <p class="rcmd_f_reason">{{reason(flower.text)}}....</p>
                            <p class="rcmd_f_num">
                                <span class="rcmd_f_m_num">{{flower.usercount}}</span>
                                <span class="rcmd_f_p_num">{{flower.tid.length}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="hots" class="good_rcmd" id="good_rcmd" alog-group="good_rcmd" style="margin-top: 30px">
                <span class="class_title">更多小组推荐</span>
                <div class="good_forum_list clearfix">
                    <div class="good_rcmd_center" id="good_rcmd_center" style="margin-left: 18px; width: 1200px">
                        <ul id="gr_f_list" class="gr_f_list clearfix" style="width: 1200px">
                            <li class="clearfix" v-for="hot in hots" v-bind:key="hot.groupname"
                                style="padding-right: 7px">
                                <router-link rel="noopener" :to="gid_url(hot.gid)" class="good_forum clearfix"
                                             target="_blank"
                                             style="background-color: #f5ece0;border: 1px solid #b5a898">
                                    <img v-bind:src="hot.grouphead" width="65"
                                         height="65" class="gf_pic">
                                    <div class="gf_desc">
                                        <p class="gf_fname">{{hot.groupname}}</p>
                                        <p class="gf_m_num">{{hot.usercount}}</p>
                                        <p class="gf_tag"></p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "GroupRecommender",
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters([
                'groupList',
                'hotGroupList',
            ]),
            flowers: function () {
                if (this.hotGroupList.length >= 3) {
                    return this.hotGroupList.slice(0, 3)
                } else {
                    return this.hotGroupList
                }
            },
            hots: function () {
                let len = this.hotGroupList.length
                if (len > 3) {
                    return this.hotGroupList.slice(3, len)
                } else {
                    return null
                }
            },
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$router': 'updateAllGroup'
        },
        methods: {
            gid_url(id) {
                return "/groupDetail/" + id
            },
            reason: function (text) {
                return text.slice(0, 14)
            },
            updatePage: function () {
                const {fullPath} = this.$route
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
            }
            ,
            updateAllGroup() {
                this.getGroup()
                this.updatePage()
            }
            ,
            getGroup() {
                this.loading = true
                this.$store.dispatch('getGroupList')
                this.loading = false
            },
        }
        ,
        created() {
            // Getting books data on created
            this.getGroup()
        }
    }
</script>

<style scoped>
    @import "../assets/css/recommend1.css";
    @import "../assets/css/recommend2.css";
    @import "../assets/css/recommend3.css";
    @import "../assets/css/recommend4.css";
    @import '../assets/css/6361ae61fa71bf01.css';

    .box-card {
        width: 480px;
    }

    .forum_recommend {
        border: 1px solid #f5ece0;
        width: 1150px;
        height: 340px;
        margin-left: 120px;
        margin-bottom: 30px;

    }

    .class_title {
        text-align: left;
        padding-left: 20px;
        background-color: #f5ece0;
    }

    .r-top-sec {
        margin-top: 50px;
    }

    .rcmd_forum_list {
        padding-left: 30px;
        width: 390px;
    }

    .gr_f_list clearfix {
        width: 168px;
        height: 69px;
    }
</style>