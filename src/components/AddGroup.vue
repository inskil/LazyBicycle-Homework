<template>
    <div>
        <Divider style="margin-top: 5%"><h1>创建小组</h1></Divider>
        <div align="center" class="primary_div">
            <br>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <div class="text">
                    <FormItem label="小组名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入小组名称"></Input>
                    </FormItem>
                    <FormItem label="小组介绍:" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :rows="10" placeholder="请输入小组介绍..."></Input>
                    </FormItem>
                </div>
                <div class="img" align="left">
                    <FormItem label="小组头像：" prop="imageUrl">
                        <el-upload v-model="formValidate.imageUrl" style="margin-top: 20%"
                                   class="avatar-uploader"
                                   action="/api/upload"
                                   :show-file-list="false"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload">
                            <img v-if="formValidate.imageUrl" :src="formValidate.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </FormItem>
                </div>
            </Form>
            <div style="margin-top: 40%;position: absolute; width: 100%" align="center">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        name: "AddGroup",
        data() {
            return {
                formValidate: {
                    name: '',
                    desc: '',
                    imageUrl: '',
                    finalUrl: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '小组名称不能为空', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '小组介绍不能为空', trigger: 'blur'},
                        {type: 'string', max: 250, message: '小组介绍不能超过250个字', trigger: 'blur'}
                    ],
                    imageUrl: [
                        {required: true, message: '小组头像不能为空', trigger: 'blur'},
                    ]
                }
            }
        },
        computed: {
            ...mapGetters([
                'userinfo',
            ]),
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        try {
                            let gid = 0
                            await this.$axios.post('/getnewgid').then(res => {
                                console.log(res)
                                gid = res.data.gid
                            }).catch(err => {
                                console.log(err)
                            })
                            let msg = {
                                "uid": this.userinfo.uid,
                                "username": this.userinfo.username,
                                "userheadimg": this.userinfo.userheadimg,
                                "groupmsg":
                                    {
                                        "groupname": this.formValidate.name,
                                        "grouphead": this.finalUrl,
                                        "gid": gid,
                                        "text": this.formValidate.desc
                                    }
                            }
                            await this.$store.dispatch('addgroup', msg)
                            this.$Message.success('创建成功');
                            this.$router.push('/group')
                        } catch (e) {
                            console.log(e)
                            this.$Message.error(e);
                        }
                    } else {
                        this.$Message.error('创建失败');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.formValidate.imageUrl = URL.createObjectURL(file.raw);
                this.finalUrl = res.data.file
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
            }
        },

    }
</script>

<style scoped>
    .primary_div {
        left: 20%;
        width: 60%;
        position: relative;
    }

    .text {
        width: 60%;
        float: left;
        position: relative;
    }

    .img {
        width: 40%;
        left: 60%;
        position: absolute;
    }

    .avatar-uploader {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
