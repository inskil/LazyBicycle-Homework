<template>
    <div  style="text-align:center">
        <div style="margin-bottom: 5%; margin-top: 5%">
            <el-divider content-position="left"><h1>上传电影</h1></el-divider>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="pb_list">
                <el-row>
<!--                    <div style="width:35%;position: absolute;right:0;top:7rem">-->
<!--                        <el-form-item label="上传头像" prop="userheadimg">-->
<!--                            <el-upload-->
<!--                                    class="avatar-uploader"-->
<!--                                    action="/api/upload"-->
<!--                                    :show-file-list="false"-->
<!--                                    :on-success="handleAvatarSuccess"-->
<!--                                    :before-upload="beforeAvatarUpload">-->
<!--                                <img v-if="userheadimg" :src="userheadimg" class="avatar">-->
<!--                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                            </el-upload>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                    <div style="width: 50%; margin-right: 5%">-->
<!--                        <el-form-item label="用户名"  prop="username" style="height: 80px">-->
<!--                            <el-input v-model="ruleForm.username"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
                    <div style="height: 80px; margin-bottom: 22px;width: 50%; margin-right: 5%">
                        <el-form-item label="电影名" prop="title" class="el-form-item__content">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 80px; margin-bottom: 22px;width: 50%; margin-right: 5%">
                        <el-form-item label="又名" prop="original_title" class="el-form-item__content">
                            <el-input v-model="ruleForm.original_title"></el-input>
                        </el-form-item>
                    </div>
                </el-row>
                <row style="height: 620px">
                    <div style="width:35%;right:0;position: absolute;top:1rem">
                        <el-form-item label="电影海报" prop="images">
                            <div style="margin-top: 15%;float: left" class="el-upload">
                                <el-upload
                                        class="avatar-uploader1"
                                        action="/api/upload"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess1"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="images" :src="images" class="avatar1">
                                    <i v-else class="el-icon-plus avatar-uploader1-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div>
                    <div style="width: 50%; margin-right: 5%; height: 320px">

                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="导演" prop="directors" class="el-form-item__content">
                                <el-input v-model="ruleForm.directors" placeholder="若有多个导演，中间请用；隔开"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="主演" prop="casts" class="el-form-item__content">
                                <el-input v-model="ruleForm.casts" placeholder="多个主演，中间请用；隔开"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="类型" prop="genres">
                                <el-input v-model="ruleForm.genres" placeholder="若有多个类型，中间请用；隔开"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="上映时间" prop="pubdates">
                                <el-input v-model="ruleForm.pubdates" placeholder="请按XXXX(年)-XX(月)-XX(日)格式输入"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="内地上映时间" prop="mainland_pubdate">
                                <el-input v-model="ruleForm.mainland_pubdate" placeholder="请按XXXX(年)-XX(月)-XX(日)格式输入"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="年份" prop="year">
                                <el-input v-model="ruleForm.year"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </row>
                <el-form-item label="剧情简介" prop="summary">
                    <el-input type="textarea" v-model="ruleForm.summary" :rows="5"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">上传电影</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // disabled: false,
                // userheadimg:'',
                images:'',
                img:'',
                ruleForm: {
                    // username: '',
                    title: '',
                    original_title: '',
                    directors: '',
                    casts: '',
                    genres: '',
                    pubdates: '',
                    mainland_pubdate: '',
                    year: '',
                    summary: ''
                },
                rules: {
                    // username: [
                    //     { required: true, message: '请输入用户名',trigger: 'blur' }
                    // ],
                    genres: [
                        { required: true, message: '请输入类型',trigger: 'blur' }
                    ],
                    // userheadimg:[
                    //     { required: true, message: '请上传图片', trigger: 'blur'}
                    // ],
                    title: [
                        { required: true, message: '请输入电影名', trigger: 'blur' },
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            let mid = 0
                            await this.$axios.post('/getnewmid').then(res => {
                                console.log(res)
                                mid = res.data.mid
                            }).catch(err => {
                                console.log(err)
                            })
                            let msg = this.ruleForm
                            msg.images = {
                                large: this.img
                            }
                            let data = {
                                mid:mid,
                                moviemsg: msg
                            }
                            await this.$axios.post('/addmovie', data).then(res => {
                                console.log('addmovie', res)
                                if (res.data.id >0) {
                                    this.$Message.success('创建成功');
                                    this.$router.push('/movieDetail/'+res.data.id)
                                }
                            })
                        } catch (e) {
                            console.log(e)
                            this.$Message.error(e);
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // handleAvatarSuccess(res, file) {
            //     this.userheadimg = URL.createObjectURL(file.raw);
            // },
            handleAvatarSuccess1(res, file) {
                this.images = URL.createObjectURL(file.raw);
                this.img = res.data.file
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

        }
    }
</script>

<style  scoped>
    .avatar-uploader{
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
    .avatar-uploader1{
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 270px;
        height: 384px;
    }
    .avatar-uploader1:hover {
        border-color: #409EFF;
    }
    .avatar-uploader1-icon {
        font-size: 28px;
        color: #8c939d;
        width: 270px;
        height: 384px;
        line-height: 384px;
        text-align: center;
    }
    .avatar1 {
        width: 270px;
        height: 384px;
        display: block;
    }
</style>