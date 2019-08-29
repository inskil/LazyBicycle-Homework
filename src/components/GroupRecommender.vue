<template>
    <div class="r-top-sec">

        <!--推荐小组标题-->
        <h1 style="text-align: left ">
            <div class="head-nav" style="padding-left: 150px ">
                <span class="head-title" style="margin-top:10%">推荐小组</span>
                <p></p>
            </div>
        </h1>

        <div class="forum_recommend" alog-alias="forum_recommend" style="background-color: #f5ece0">
            <div class="day_rcmd clearfix" id="day_rcmd" alog-group="day_rcmd">
                <span class="class_title" style="margin-top: 15px">朵朵奇吧</span>

                <div class="rcmd_forum_list" style=" width: 340px" v-for="flower in flowers" v-bind:key="flower.name">
                    <div class="rcmd_forum clearfix" style="padding-right: 0px">
                        <a rel="noopener" href="/f?kw=%E6%98%8E%E6%98%9F" target="_blank" class="rcmd_forum_img">
                            <img v-bind:src="flower.images.large" width="95" height="95" alt="华为">
                        </a>
                        <div class="rcmd_forum_desc" style="width: 220px">
                            <p class="rcmd_f_name">
                                <a rel="noopener" href="/f?kw=%E6%98%8E%E6%98%9F" target="_blank">{{flower.name}}</a>
                            </p>
                            <p class="rcmd_f_reason">{{flower.reason}}</p>
                            <p class="rcmd_f_num">
                                <span class="rcmd_f_m_num">{{flower.mnum}}</span>
                                <span class="rcmd_f_p_num">{{flower.pnum}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="good_rcmd" id="good_rcmd" alog-group="good_rcmd" style="margin-top: 30px">
                <span class="class_title">2019爆红小组</span>
                <div class="good_forum_list clearfix">
                    <div class="good_rcmd_center" id="good_rcmd_center" style="margin-left: 18px; width: 1200px">
                        <ul id="gr_f_list" class="gr_f_list clearfix" style="width: 1200px">
                            <li class="clearfix" v-for="hot in hots" v-bind:key="hot.name" style="padding-right: 7px">

                                <a rel="noopener" class="good_forum clearfix"
                                   href="/f?kw=%E6%9D%8E%E6%B1%B6%E7%BF%B0"
                                   target="_blank" style="background-color: #f5ece0;border: 1px solid #b5a898">
                                    <img v-bind:src="hot.images.large" width="65"
                                         height="65" class="gf_pic">
                                    <div class="gf_desc">
                                        <p class="gf_fname">{{hot.name}}</p>
                                        <p class="gf_m_num">{{hot.num}}</p>
                                        <p class="gf_tag"></p>
                                    </div>
                                </a>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GroupRecommender",
        data() {
            return {
                flowers: [
                    {
                        name: "华为小组",
                        reason: "因为有你，一陆热爱",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        mnum: "2889825",
                        pnum: "29368846",
                    },
                    {
                        name: "华为小组",
                        reason: "因为有你，一陆热爱",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        mnum: "2889825",
                        pnum: "29368846",
                    },
                    {
                        name: "华为小组",
                        reason: "因为有你，一陆热爱",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                        mnum: "2889825",
                        pnum: "29368846",
                    },
                ],
                hots: [
                    {
                        name: "荷兰弟",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                    {
                        name: "荷弟",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                    {
                        name: "兰弟",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                    {
                        name: "荷兰军团",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                    {
                        name: "荷兰弟军",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                    {
                        name: "荷弟军团",
                        num: "5600",
                        images: {
                            large: "https://images.weserv.nl/?url=https://img3.doubanio.com/icon/g18454-3.jpg"
                        },
                    },
                ]
            }
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
    .rcmd_forum_list{
        padding-left: 30px;
        width: 390px;
    }
    .gr_f_list clearfix{
        width: 168px;
        height: 69px;
    }
</style>