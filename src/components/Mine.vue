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
                        <img v-if="userinfo.userheadimg" :src="userinfo.userheadimg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="name_div">
                        <h1 class="name" align="left">{{userinfo.username}}</h1>
                        <Button type="text" icon="md-create" size="large" class="name_btn"
                                @click="changeName = true"></Button>
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
                        <div class="signature" align="left">个性签名：{{userinfo.signature}}</div>
                        <Button type="text" icon="md-create" size="large" class="signature_btn"
                                @click="changeSignature = true"></Button>
                        <Modal
                                v-model="changeSignature"
                                title="修改个性签名"
                                @on-ok="signatureSubmit('signatureForm')"
                                @on-cancel="cancel">
                            <Form ref="signatureForm" :model="signatureForm" :rules="signatureRule" :label-width="80">
                                <FormItem label="个性签名:" prop="newSignature">
                                    <Input v-model="signatureForm.newSignature" type="textarea" :rows="3"
                                           placeholder="请输入个性签名"></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <div class="card_right" align="left">
                    <h3>个人数据</h3><br>
                    加入时间：{{userinfo.createtime}}<br>
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
                            <img class="pic" :src="book.images[0].large">
                        </div>
                        <div class="title">{{book.title}}</div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="电影收藏" icon="md-film" class="collection">
                <Row>
                    <Col v-for="movie in movies" span="4" align="center">
                        <div class="material-card material-hover material-shadow-2">
                            <img class="pic" :src="movie.images[0].large">
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
                    <Col v-for="message in noticeList" span="12">
                        <Card class="message" align="left">
                            <Avatar v-bind:src="message.userheadimg" size="large" class="message_head"></Avatar>
                            <div class="message_content">
                                <span class="message_user">{{message.username}} </span>
                                <span v-if="message.type==='apply'">申请成为<span class="message_group"> {{message.groupname}} </span>的管理员</span>
                                <span v-if="message.type==='notice'">回复了你在<span class="message_group"> {{message.groupname}} </span>发的帖子</span>
                                <span v-if="message.type==='success'">通过了你在<span class="message_group"> {{message.groupname}} </span>的管理员申请</span>
                            </div>
                            <div class="message_time">{{message.createtime}}</div>
                            <Button v-if="message.type==='apply'" style="left: 40%" type="success" shape="circle"
                                    icon="md-checkmark" class="message_btn" ghost></Button>
                            <Button v-if="message.type==='apply'" style="right: 40%" type="error" shape="circle"
                                    icon="md-close" class="message_btn" ghost></Button>
                            <Button v-else style="left: 46%" type="primary" shape="circle" icon="md-checkmark"
                                    class="message_btn" ghost></Button>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
            <TabPane v-if="ismanager" label="内容添加" icon="md-settings" class="messages">
                <Row>
                    <Col span="12">
                        <Card style="margin-left: 10%; margin-right: 5%; font-size: large; background-color: rgba(255,230,112,0.10)">
                            <Avatar icon="ios-book" size="large"  style="background-color: #ffe670"/>
                            添加书籍
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card style="margin-left: 5%; margin-right: 10%; font-size: large; background-color: rgba(255,159,93,0.10)">
                            <Avatar icon="ios-film" size="large"  style="background-color: #ff9f5d"/>
                            添加电影
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                changeName: false,
                changeSignature: false,
                nameForm: {
                    newName: ''
                },
                nameRule: {
                    newName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                },
                signatureForm: {
                    newSignature: ''
                },
                signatureRule: {
                    newSignature: [
                        {type: 'string', max: 20, message: '个性签名不能超过25个字', trigger: 'blur'}
                    ],
                },
            };
        },
        computed: {
            ...mapGetters([
                'groupList',
                'bookList',
                'movieList',
                'userinfo',
                'noticeList',
                'ismanager'
            ]),
            groups: function () {
                let group = this.userinfo.group
                if (group) {
                    let list = this.groupList.filter(item => group.includes(item.gid))
                    return list
                } else return null
            },
            movies: function () {
                let likemovie = this.userinfo.likemovies
                if (likemovie) {
                    return this.movieList.filter(item => likemovie.includes(parseInt(item.id)))
                } else return null
            },
            books: function () {
                let likebook = this.userinfo.likebooks
                if (likebook) {
                    return this.bookList.filter(item => likebook.includes(parseInt(item.id)))
                } else return null
            },
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
            cancel() {
                this.$Message.info('修改取消');
            },
            nameSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.usermsg.username = this.nameForm.newName;
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            signatureSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.usermsg.signature = this.signatureForm.newSignature;
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            }
        },
        created(){
            let data = {
                uid: this.userinfo.uid
            }
            this.$store.dispatch('getNotice',data)
        }
    }
</script>

<style>
    @import "~@/assets/css/ripple.min.css";

    .avatar-uploader {
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

    .main_div {
        left: 10%;
        width: 80%;
        margin-top: 1rem;
        position: relative;
    }

    .card_left {
        left: 0;
        width: 60%;
        position: relative;
        border-right: rgba(0, 0, 0, 0.05) 0.1rem solid;
    }

    .card_right {
        left: 60%;
        width: 40%;
        top: 0;
        position: absolute;
        padding: 3rem;
    }

    .head_img {
        margin: 2rem;
    }

    .name_div {
        left: 14rem;
        top: 0;
        position: absolute;
        height: 40%;
    }

    .name {
        top: 0;
        position: relative;
        width: 12rem;
    }

    .name_btn {
        left: 18.5rem;
        top: 0;
        position: absolute
    }

    .signature_div {
        left: 14rem;
        top: 50%;
        position: absolute;
    }

    .signature {
        top: 0;
        width: 18rem;
        white-space: pre-line;
        position: relative
    }

    .signature_btn {
        left: 18.5rem;
        top: 0;
        position: absolute
    }

    .collection {
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

    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: larger;
        padding: 0.5rem;
    }

    .message {
        margin: 1rem;
        padding: 1rem;
        height: 9rem;
    }

    .message_content {
        left: 5.5rem;
        top: 2.7rem;
        position: absolute;
        vertical-align: middle;
    }

    .message_user {
        font-size: larger;
        font-weight: bold;
    }

    .message_group {
        font-weight: bold;
    }

    .message_time {
        top: 10%;
        right: 1rem;
        position: absolute
    }

    .message_btn {
        bottom: 1rem;
        position: absolute
    }
</style>
