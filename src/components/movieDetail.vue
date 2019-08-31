<template>
    <div class="body">
        <Card class="main_body">
            <div style="position: absolute; right: 1rem; top:1rem">
                <Button v-if='ismanager' type="error" ghost style="margin-right: 1rem">删除电影</Button>
                <i-button v-if="!iscollected" @click="heart_success" icon="md-heart-outline">收藏</i-button>
                <i-button v-else @click="heart_cancel" icon="md-heart" type="primary" ghost>已收藏</i-button>
            </div>
            <div class="headtitle">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">{{movie.title}}</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div class="infomations">
                <div id="mainpic">
                    <a class="nbg" v-bind:href="movie.images[0].large"
                       v-bind:title="movie.title">
                        <img v-bind:src="movie.images[0].large" v-bind:alt="movie.title" rel="v:photo"
                             style="width: 135px;max-height: 200px;">
                    </a>
                </div>
                <div class="maininfo" align="left"
                     style="left: 3rem; height: 12rem; padding-top: 2rem; position: relative;">
                    <span class="pl">原名: {{movie.original_title}}</span><br>
                    <span class="pl">导演: {{movie.directors[0].name}}</span><br>
                    <span class="pl">上映时间: {{movie.year}}</span><br>
                    <span class="pl">电影时长: {{movie.durations[0]}}</span><br>
                </div>
            </div>
            <div class="votes">
                <div>
                    <span class="rl">评分<br> <strong>{{movie.rating[0]?movie.rating[0].average : movie.rating.average}}</strong></span><br>
                </div>
                <div>
                    <my-rate :message="movie.rating[0]?movie.rating[0].average : movie.rating.average"></my-rate>
                    <br>
                </div>
                <div>
                    <span class="rl">评价人数: {{movie.likes}}</span>
                </div>
            </div>

        </Card>

        <div class="summary_body">
            <div id="summary_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>剧情简介</h2></Divider>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{movie.summary}}</p>
            </div>
        </div>
        <div id="review_body" >
            <div id="review_title" v-if="movieReviewList.length>0">
                <Divider orientation="left" property="v:itemreviewed"><h2>热门评论</h2></Divider>
            </div>
            <div id="review_review">
                <div v-for="review in movieReviewList" v-bind:key="review.id" class="review_author" align="left">
                    <span style="color: #666666">
                        {{review.author.name}} · {{review.created_at}}
                    </span>
                    <span style="right: 18%; position:absolute;">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </span>
                    <div class="cell_dashed">
                        <p class="review_summary">{{review.content}}</p>
                    </div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
            <div>
                <Divider orientation="left" property="v:itemreviewed"><h2>发表评论</h2></Divider>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="width: 100%; margin-top: 1rem">
                <FormItem prop="value" style="width: 20%; left: 40%; position: relative">
                    <Rate :value.sync="value" style="font-size: xx-large"></Rate>
                </FormItem>
                <FormItem prop="comment">
                    <Input v-model="formValidate.comment" type="textarea" :rows="5" placeholder="在这里发表你的评论"/>
                </FormItem>
                <FormItem class="review_buttom" align="right" style="position: relative; right: 1rem">
                    <Button @click="handleSubmit('formValidate')" icon="md-send">发送</Button>
                </FormItem>
            </Form>
        </div>
        <Back-top></Back-top>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import myRate from "./myRate";

    export default {
        name: "movieinfo",
        components: {
            myRate
        },
        data() {
            return {
                formValidate: {
                    comment: '',
                    value: ''
                },
                ruleValidate: {
                    comment: [
                        {required: true, message: '评论不能为空', trigger: 'blur'},
                        {type: 'string', min: 25, message: '评论不能少于25个字', trigger: 'blur'},
                        {type: 'string', max: 1000, message: '评论不能多于1000个字', trigger: 'blur'}
                    ],
                    value: [
                        {required: true, message: '评分不能为空', trigger: 'blur'}
                    ]
                },
                iscollected: false,
                value: 0,
                summary_value: ''
            }
        },
        computed: {
            ...mapGetters([
                'movieList',
                'movieReviewList',
                'userinfo',
                'ismanager'
            ]),
            movie() {
                let movies = this.movieList.filter(item => item.id == this.$route.params.id)
                return movies[0]
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('评价发表成功');
                        this.summary_value = this.formValidate.comment;
                    } else {
                        this.$Message.error('评价发表失败');
                    }
                })
            },
            heart_success() {
                let data = {
                    mid: this.movie.id,
                    uid: this.userinfo.uid
                }
                this.$axios.post('/user/likemovie', data).then(res => {
                    console.log(res)
                    if (res.mid) {
                        console.log('收藏')
                    }
                }).catch(err => {
                    console.log(err)
                    this.getcollected()
                    this.$Message.error(err);
                });
                this.iscollected = true;
                this.$Message.success('收藏成功!');
            },
            heart_cancel() {
                let data = {
                    mid: this.movie.id,
                    uid: this.userinfo.uid
                }
                this.$axios.post('/user/unlikemovie', data).then(res => {
                    console.log(res)
                    if (res.mid) {
                        console.log('取消')
                    }
                }).catch(err => {
                    console.log(err)
                    this.getcollected()
                    this.$Message.error(err);
                });
                this.iscollected = false;
                this.$Message.success('收藏已取消!');
            },
            async getcollected() {
                console.log('cccccccccccccollececetd')
                let data = {
                    mid: this.movie.id,
                    uid: this.userinfo.uid
                }
                await this.$axios.post('/user/isuserlikemovie', data).then(res => {
                    console.log('res.data.result', res.data.result)
                    if (res.data.result) {
                        console.log('res.data.result', res.data.result)
                        this.iscollected = res.data.result
                    } else {
                        this.iscollected = false
                    }
                }).catch(err => {
                    console.log(err)
                    this.iscollected = false
                });
            },
            async delmovie() {
                let data = {
                    bid: this.movie.id,
                }
                this.$axios.post('/removeMovie', data).then(res => {
                    console.log(res)
                    if (res.data == success) {
                        console.log('删除成功')
                        this.$Message.success('收藏已取消!');
                    }
                }).catch(err => {
                    console.log(err)
                    this.getcollected()
                    this.$Message.error(err);
                });
            },
            update() {
                this.getcollected()
            },
        },
        watch: {
            '$route': 'update',
            movie: function () {
                this.$store.dispatch('getmoviereviewList', this.movie.id)
                this.update()
            },
        },
        created() {
            this.update()
        }
    }


</script>

<style scoped>
    @import "../assets/css/infos.css";
</style>
