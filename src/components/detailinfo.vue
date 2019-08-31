<template>
    <div class="body">
        <Card class="main_body">
            <div style="position: absolute; right: 1rem; top:1rem">
                <Button v-if='ismanager' @click="delbook" type="error" ghost style="margin-right: 1rem">删除书籍</Button>
                <i-button v-if="!iscollected" @click="heart_success" icon="md-heart-outline">收藏</i-button>
                <i-button v-else @click="heart_cancel" icon="md-heart" type="primary" ghost>已收藏</i-button>
            </div>
            <div class="headtitle">
                <h1 style="text-align: left">
                    <span property="v:itemreviewed">{{book.title}}</span>
                    <div class="clear"></div>
                </h1>
            </div>
            <div class="infomations">
                <div id="mainpic">
                    <a class="nbg" v-bind:href="book.images[0].large"
                       v-bind:title="book.title">
                        <img v-bind:src="book.images[0].large" v-bind:alt="title" rel="v:photo"
                             style="width: 135px;max-height: 200px;">
                    </a>
                </div>
                <div class="maininfo" align="left" style="left: 3rem; position: relative; height: 12rem;">
                    <span class="pl">作者: {{book.author[0]}}</span><br>
                    <span class="pl">出版社: {{book.publisher}}</span><br>
                    <span class="pl">出版时间: {{book.pubdate}}</span><br>
                    <span class="pl">页数: {{book.pages}}</span><br>
                    <span class="pl">定价: {{book.price}}</span><br>
                    <span class="pl">ISBN: {{book.isbn13}}</span><br>
                </div>
            </div>
            <div class="votes">
                <div>
                    <span class="rl">评分<br> <strong>{{book.rating[0].average}}</strong></span><br>
                </div>
                <div>
                    <my-rate :message="book.rating[0].average"></my-rate>
                    <br>
                </div>
                <div>
                    <span class="rl">评价人数: {{book.rating[0].numRaters}}</span>
                </div>
            </div>

        </Card>

        <div class="summary_body">
            <div id="summary_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>内容简介</h2></Divider>
            </div>
            <div id="summary_summary">
                <p class="p2" style="text-align: left">{{book.summary}}</p>
            </div>
        </div>
        <div class="author_body">
            <div id="author_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>作者简介</h2></Divider>
            </div>
            <div id="author_summary">
                <p class="p2" style="text-align: left">{{book.author_intro}}</p>
            </div>
        </div>
        <div class="catalog_body">
            <div id="catalog_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>目录</h2></Divider>
            </div>
            <div id="catalog_summary">
                <pre class="p3" style="text-align: left">{{book.catalog}}</pre>
            </div>
        </div>
        <div id="review_body">
            <div id="review_title">
                <Divider orientation="left" property="v:itemreviewed"><h2>本书评论</h2></Divider>
            </div>
            <div id="review_review">
                <div v-for="review in bookReviewList" v-bind:key="review.id" class="review_author" align="left">
                    <span style="color: #666666">
                        {{review.author.name}} · {{review.published}}
                    </span>
                    <span style="right: 18%; position:absolute;">
                        <Rate disabled allow-half v-model="review.rating.value"/>
                    </span>
                    <div class="cell_dashed">
                        <p class="review_summary">{{review.summary}}</p>
                    </div>
                </div>
                <div style="height: 15px; width: 100%"></div>
            </div>
            <div>
                <Divider orientation="left" property="v:itemreviewed"><h2>发表评论</h2></Divider>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" style="width: 100%; margin-top: 1rem">
                <FormItem prop="value" style="width: 20%; left: 40%; position: relative">
                    <Rate :value.sync="value" v-model="formValidate.value" style="font-size: xx-large"></Rate>
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
    import myRate from "@/components/myRate";

    export default {
        name: "detailinfo",
        components: {
            myRate
        },
        data() {
            const validateValue = (rule, value, callback) => {
                if (value===0) {
                    return callback(new Error('评分不能为空'));
                }
                else{
                    callback();
                }
            };
            return {
                formValidate: {
                    comment: '',
                    value: 0
                },
                ruleValidate: {
                    comment: [
                        {required: true, message: '评论不能为空', trigger: 'blur'},
                        {type: 'string', min: 25, message: '评论不能少于25个字', trigger: 'blur'},
                        {type: 'string', max: 1000, message: '评论不能多于1000个字', trigger: 'blur'}
                    ],
                    value: [
                        {validator: validateValue, trigger: 'blur'}
                    ]
                },
                iscollected: false,     //是否已收藏
                value: 0,
                summary_value: ''
            }
        },
        computed: {
            ...mapGetters([
                'bookList',
                'bookReviewList',
                'userinfo',
                'ismanager'
            ]),
            book() {
                let books = this.bookList.filter(item => item.id == this.$route.params.id)
                return books[0]
            },
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('评价发表成功');
                        this.summary_value = this.formValidate.comment;
                        this.value=this.formValidate.value;
                    } else {
                        this.$Message.error('评价发表失败');
                    }
                })
            },
            async getcollected() {
                console.log('cccccccccccccollececetd')
                let data = {
                    bid: this.book.id,
                    uid: this.userinfo.uid
                }
                await this.$axios.post('/user/isuserlikebook', data).then(res => {
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
            async heart_success() {
                let data = {
                    bid: this.book.id,
                    uid: this.userinfo.uid
                }
                this.$axios.post('/user/likebook', data).then(res => {
                    console.log(res)
                    if (res.bid) {
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
            async heart_cancel() {
                let data = {
                    bid: this.book.id,
                    uid: this.userinfo.uid
                }
                this.$axios.post('/user/unlikebook', data).then(res => {
                    console.log(res)
                    if (res.bid) {
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
            async delbook() {
                let data = {
                    bid: this.book.id,
                }
                this.$axios.post('/removeBook', data).then(res => {
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

            }
        },
        watch: {
            '$route': 'update',
            book: function () {
                this.$store.dispatch('getbookreviewList', this.book.id)
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
