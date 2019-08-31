<template>
    <div  style="text-align:center">
        <div style="margin-bottom: 5%; margin-top: 5%">
            <el-divider content-position="left"><h1>上传电影</h1></el-divider>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="pb_list">
<!--                <el-row>-->
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
<!--                </el-row>-->
                <row style="height: 510px">
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
                    <div style="width:35%;right:0;position: absolute;top:7rem">
                        <el-form-item label="电影海报" prop="image">
                            <div class="el-upload">
                                <el-upload
                                        v-model="ruleForm.image"
                                        class="avatar-uploader1"
                                        action="/api/upload"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess1"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar1">
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
<!--                        <div style="height: 80px; margin-bottom: 22px">-->
<!--                            <el-form-item label="上映时间" prop="pubdates">-->
<!--                                <el-input v-model="ruleForm.pubdates" placeholder="请按XXXX(年)-XX(月)-XX(日)格式输入"></el-input>-->
<!--                            </el-form-item>-->
<!--                        </div>-->
                    </div>
                </row>
                <div style="height: 80px; margin-bottom: 22px">
                    <el-form-item label="时长" prop="durations">
                        <el-input v-model="ruleForm.durations"></el-input>
                    </el-form-item>
                </div>
                <div style="height: 80px; margin-bottom: 22px">
                    <el-form-item label="年份" prop="year">
                        <el-input v-model="ruleForm.year"></el-input>
                    </el-form-item>
                </div>
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
                // images:'',
                ruleForm: {
                    // username: '',
                    title: '',
                    original_title: '',
                    directors: '',
                    casts: '',
                    genres: '',
                    // pubdates: '',
                    durations: '',
                    year: '',
                    summary: '',
                    image:''
                },
                rules: {
                    // username: [
                    //     { required: true, message: '请输入用户名',trigger: 'blur' }
                    // ],
                    // genres: [
                    //     { required: true, message: '请输入类型',trigger: 'blur' }
                    // ],
                    // userheadimg:[
                    //     { required: true, message: '请上传图片', trigger: 'blur'}
                    // ],
                    title: [
                        { required: true, message: '请输入电影名', trigger: 'blur' },
                    ],
                    image:[
                        {required: true, message: '请上传电影海报', trigger: 'blur'}
                    ],
                    directors: [
                        {required: true, message: '请输入导演', trigger: 'blur'}
                    ],
                    year: [
                        {required: true, message: '请输入年份', trigger: 'blur'}
                    ],
                    durations:[
                        {required: true, message: '请输入时长', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '请输入剧情简介', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            handleAvatarSuccess(res, file) {
                this.userheadimg = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess1(res, file) {
                this.ruleForm.image = URL.createObjectURL(file.raw);
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
