<template>
    <div style="width: 1200px">
        <div style="width: 100%; float: top; height: 80px"></div>
        <div style="width: 20%;float:left;height:1200px"></div>
        <div id="top_body" style="width: 960px; float: right;height: 400px">
            <div id="body_left" style="float: left;width: 60%; height: 200px;">
                <div style="float: left;  width: 100%">
                    <img v-bind:src="userhead" style="width: 135px;max-height: 135px; float: left">
                    <div style="margin-left: 10px;width:300px;margin-top: 100px"><span
                            style="font: 26px 'Abril Fatface'">{{username}}</span>
                    </div>
                </div>
                <div style="float: left;width:600px; height: 200px;">
                    <div id="review_title">
                        <h1 style="text-align: left; padding-top: 50px">
                            <span property="v:itemreviewed">留言板· · · · · ·</span>
                            <div class="clear"></div>
                        </h1>
                    </div>
                    <div style="width: 60%; float:left ;padding-top: 30px;">
                        <div id="review_kuang">
                            <Input v-model="summary_value" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="说点什么吧..."/>
                        </div>
                        <div id="review_buttom" style="padding-top: 5px; float:right;">
                            <div>
                                <i-button @click="review_success(true)">发表</i-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="border-left-style: groove ;height: 380px; width: 0px;float: left"></div>
            <div id="body_right" style="float:right; width: 300px ;padding-top: 200px">
                <div id="user_info" style="float:left;">
                    <p>邮箱： {{useremail}}</p>
                    <p>注册时间： {{usersigintime}}</p>
                    <p>性别：{{usersex}}</p>
                    <p>好友数： {{userfriend}}</p>
                    <p>小组数： {{usergroup}}</p>
                    <p>收藏数： {{userlikes}}</p>
                </div>
            </div>
        </div>
        <div>

        </div>


        <div class="like_body" style="float: left;width: 80%; height: 200px; padding-top: 50px">
            <div id="summary_title">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">我的收藏  · · · · · ·</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div class="movie_list" style="padding-top: 40px">
                <div v-for="movie in movieList" :key="movie" style="height: 250px; width: 20% ; float: left">
                    <a v-bind:href="movie.url" style="float: top">
                        <img v-bind:src="movie.img" style="width: 100px;height: auto">
                        <p>{{movie.name}}</p>
                        <Rate disabled allow-half v-model="movie.rate" style="float: bottom"/>
                    </a>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "Mine",
        data() {
            return {

                userhead: "https://i.loli.net/2017/08/21/599a521472424.jpg",
                username: "巴啦啦小魔仙",


                limitNum: 5,
                limitFrom: 0,
                movieList: [
                    {
                        name: '肖申克的救赎',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 4.8,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '这个杀手不太冷',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 4.7,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '霸王别姬',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 4.7,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '阿甘正传',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 4.7,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '美丽人生',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 4.6,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '千与千寻',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 4.6,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '辛德勒的名单',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 4.7,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '海上钢琴师',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 4.6,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '机器人总动员',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 4.5,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    },
                    {
                        name: '盗梦空间',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 4.6,
                        img: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
                    }
                ],
                randomMovieList: []
            }
        },
        methods: {
            changeLimit() {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i < num; i++) {
                        if (temp_array.length > 0) {
                            const arrIndex = Math.floor(Math.random() * temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }

                this.randomMovieList = getArrayItems(this.movieList, 5);
            }
        },
        mounted() {
            this.changeLimit();
        }
    }
</script>

<style scoped>
    @import "../assets/css/infos.css";
    #user_info {
        font: 16px "Abril Fatface";
        text-align: left;
    }
</style>