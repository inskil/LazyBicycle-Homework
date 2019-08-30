<template>
    <div class="main_div">
        <Card>
            <div style="margin: 1rem">
                <div class="card_left">
                    <el-upload
                            class="head_img avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="usermsg.userheadimg" :src="usermsg.userheadimg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="name_div">
                        <h1 class="name" align="left">{{usermsg.username}}</h1>
                        <Button type="text" icon="md-create" size="large" class="name_btn" @click="changeName = true"></Button>
                        <Modal
                                v-model="changeName"
                                title="修改姓名"
                                @on-ok="nameSubmit('nameForm')"
                                @on-cancel="cancel">
                            <Form ref="nameForm" :model="nameForm" :rules="nameRule" :label-width="80">
                                <FormItem label="新用户名:" prop="newName">
                                    <Input v-model="nameForm.newName" placeholder="请输入新用户名"></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                    <div class="signature_div">
                        <div class="signature" align="left">个性签名：{{usermsg.signature}}</div>
                        <Button type="text" icon="md-create" size="large" class="signature_btn" @click="changeSignature = true"></Button>
                        <Modal
                                v-model="changeSignature"
                                title="修改个性签名"
                                @on-ok="signatureSubmit('signatureForm')"
                                @on-cancel="cancel">
                            <Form ref="signatureForm" :model="signatureForm" :rules="signatureRule" :label-width="80">
                                <FormItem label="个性签名:" prop="newSignature">
                                    <Input v-model="signatureForm.newSignature" type="textarea" :rows="3" placeholder="请输入个性签名"></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div class="card_right" align="left">
                    <h3>个人数据</h3><br>
                    加入时间：{{usermsg.createtime}}<br>
                    书籍收藏数：{{books.length}}<br>
                    电影收藏数：{{movies.length}}<br>
                    加入小组数：{{groups.length}}
                </div>
            </div>
        </Card>
        <br>
        <Tabs>
            <TabPane label="书籍收藏" icon="md-bookmarks" class="collection">
                <Row>
                    <Col v-for="book in books" span="4" align="center">
                        <div class="material-card material-hover material-shadow-2">
                            <img class="pic" :src="book.images.large">
                        </div>
                        <div class="title">{{book.title}}</div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="电影收藏" icon="md-film" class="collection">
                <Row>
                    <Col v-for="movie in movies" span="4" align="center">
                        <div class="material-card material-hover material-shadow-2">
                            <img class="pic" :src="movie.images.large">
                        </div>
                        <div class="title">{{movie.title}}</div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="我的小组" icon="md-people" class="collection">
                <Row>
                    <Col v-for="group in groups" span="4" align="center">
                        <div class="group-card material-hover material-shadow-2">
                            <img class="pic" :src="group.grouphead">
                        </div>
                        <div class="title">{{group.groupname}}</div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="通知信息" icon="md-mail" class="messages">
                <Row>
                    <Col v-for="message in messages" span="12">
                        <Card class="message" align="left">
                            <Avatar v-bind:src="message.userheadimg" size="large" class="message_head"></Avatar>
                            <div class="message_content">
                                <span class="message_user">{{message.username}} </span>
                                <span v-if="message.type==='apply'">申请成为<span class="message_group"> {{message.groupname}} </span>的管理员</span>
                                <span v-if="message.type==='notice'">回复了你在<span class="message_group"> {{message.groupname}} </span>发的帖子</span>
                                <span v-if="message.type==='success'">通过了你在<span class="message_group"> {{message.groupname}} </span>的管理员申请</span>
                            </div>
                            <div class="message_time">{{message.createtime}}</div>
                            <Button v-if="message.type==='apply'" style="left: 40%" type="success" shape="circle" icon="md-checkmark" class="message_btn" ghost></Button>
                            <Button v-if="message.type==='apply'" style="right: 40%" type="error" shape="circle" icon="md-close" class="message_btn" ghost></Button>
                            <Button v-else style="left: 46%" type="primary" shape="circle" icon="md-checkmark" class="message_btn" ghost></Button>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                changeName: false,
                changeSignature:false,
                nameForm:{
                    newName:''
                },
                nameRule:{
                    newName: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                },
                signatureForm:{
                    newSignature:''
                },
                signatureRule:{
                    newSignature: [
                        { type: 'string', max: 20, message: '个性签名不能超过25个字', trigger: 'blur' }
                    ],
                },
                usermsg:{
                    userheadimg: 'https://img3.doubanio.com/icon/ul57495035-24.jpg',
                    uid:"ren_ran",
                    username:"荏苒",
                    signature:"自由而无用的灵魂",
                    createtime:"2012-01-03"
                },
                groups:[
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp"
                    },
                    {
                        groupname:"阅读是幸福时光的糖",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/a58377c401d37cd.webp"
                    },
                    {
                        groupname:"每月养成一个好习惯",
                        grouphead:"https://img3.doubanio.com/icon/g111410-23.jpg"
                    },
                    {
                        groupname:"一个陌生人的来信◎互寄明信片",
                        grouphead:"https://img1.doubanio.com/view/group/sqxs/public/3892a0b4d233ecb.webp"
                    },
                    {
                        groupname:"最近我们读了同一本书",
                        grouphead:"https://img3.doubanio.com/icon/g290366-1.jpg"
                    },
                    {
                        groupname:"北京国际电影节",
                        grouphead:"https://img3.doubanio.com/icon/g325380-2.jpg"
                    },
                    {
                        groupname:"句子迷",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/4a62c83f688cbdd.webp"
                    },
                    {
                        groupname:"阅读是幸福时光的糖",
                        grouphead:"https://img3.doubanio.com/view/group/sqxs/public/a58377c401d37cd.webp"
                    },
                    {
                        groupname:"每月养成一个好习惯",
                        grouphead:"https://img3.doubanio.com/icon/g111410-23.jpg"
                    },
                    {
                        groupname:"一个陌生人的来信◎互寄明信片",
                        grouphead:"https://img1.doubanio.com/view/group/sqxs/public/3892a0b4d233ecb.webp"
                    },
                    {
                        groupname:"最近我们读了同一本书",
                        grouphead:"https://img3.doubanio.com/icon/g290366-1.jpg"
                    },
                    {
                        groupname:"北京国际电影节",
                        grouphead:"https://img3.doubanio.com/icon/g325380-2.jpg"
                    }
                ],
                movies:[
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    },
                    {
                        title:"霸王别姬",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg"
                        }
                    }
                ],
                books:[
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    },
                    {
                        title:"追风筝的人",
                        images:{
                            large:"https://images.weserv.nl/?url=https://img3.doubanio.com/view/subject/l/public/s1727290.jpg"
                        }
                    }
                ],
                messages:[
                    {
                        username: "陈言冬",
                        userheadimg: "https://img3.doubanio.com/icon/ul62707945-13.jpg",
                        createtime: "2012-12-09 00:13:21",
                        type: "apply",
                        groupname: "句子迷"
                    },
                    {
                        username: "_不负相思引",
                        userheadimg: "https://img3.doubanio.com/icon/ul66034478-2.jpg",
                        createtime: "2013-12-09 00:13:21",
                        type: "notice",
                        groupname: "句子迷"
                    },
                    {
                        username: "陈言冬",
                        userheadimg: "https://img3.doubanio.com/icon/ul62707945-13.jpg",
                        createtime: "2014-12-09 00:13:21",
                        type: "success",
                        groupname: "句子迷"
                    },
                    {
                        username: "YippeeH",
                        userheadimg: "https://img3.doubanio.com/icon/ul42989333-254.jpg",
                        createtime: "2015-12-09 00:13:21",
                        type: "apply",
                        groupname: "句子迷"
                    },
                    {
                        username: "YippeeH",
                        userheadimg: "https://img3.doubanio.com/icon/ul42989333-254.jpg",
                        createtime: "2016-12-09 00:13:21",
                        type: "notice",
                        groupname: "句子迷"
                    },
                    {
                        username: "_不负相思引",
                        userheadimg: "https://img3.doubanio.com/icon/ul66034478-2.jpg",
                        createtime: "2017-12-09 00:13:21",
                        type: "success",
                        groupname: "句子迷"
                    }
                ]
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.usermsg.userheadimg = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$Message.error('图片仅支持JPG格式');
                }
                if (!isLt2M) {
                    this.$Message.error('图片大小不能超过2MB');
                }
                return isJPG && isLt2M;
            },
            cancel () {
                this.$Message.info('修改取消');
            },
            nameSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.usermsg.username=this.nameForm.newName;
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            signatureSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.usermsg.signature=this.signatureForm.newSignature;
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            }
        }
    }
</script>

<style>
    @import "~@/assets/css/ripple.min.css";
    .avatar-uploader{
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 10rem;
        height: 10rem;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 10rem;
        height: 10rem;
        line-height: 10rem;
        text-align: center;
    }
    .avatar {
        width: 10rem;
        height: 10rem;
        display: block;
    }
    .main_div{
        left: 10%;
        width: 80%;
        margin-top: 1rem;
        position: relative;
    }
    .card_left{
        left: 0;
        width: 60%;
        position: relative;
        border-right: rgba(0, 0, 0, 0.05) 0.1rem solid;
    }
    .card_right{
        left: 60%;
        width: 40%;
        top:0;
        position: absolute;
        padding: 3rem;
    }
    .head_img{
        margin: 2rem;
    }
    .name_div{
        left: 14rem;
        top:0;
        position: absolute;
        height: 40%;
    }
    .name{
        top:0;
        position: relative;
        width: 12rem;
    }
    .name_btn{
        left:18.5rem;
        top:0;
        position: absolute
    }
    .signature_div{
        left: 14rem;
        top: 50%;
        position: absolute;
    }
    .signature{
        top:0;
        width: 18rem;
        white-space: pre-line;
        position: relative
    }
    .signature_btn{
        left:18.5rem;
        top:0;
        position: absolute
    }
    .collection{
        padding: 2rem;
    }
    .material-card {
        width: 6rem;
        height: 8rem;
        text-align: left;
    }
    .pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .group-card {
        width: 5rem;
        height: 5rem;
        text-align: left;
    }
    .title{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: larger;
        padding:0.5rem;
    }
    .message{
        margin: 1rem;
        padding: 1rem;
        height: 9rem;
    }
    .message_content{
        left: 5.5rem;
        top: 2.7rem;
        position: absolute;
        vertical-align: middle;
    }
    .message_user{
        font-size: larger;
        font-weight: bold;
    }
    .message_group{
        font-weight: bold;
    }
    .message_time{
        top:10%;
        right:1rem;
        position: absolute
    }
    .message_btn{
        bottom: 1rem;
        position: absolute
    }
</style>
