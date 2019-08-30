<template>
    <div  style="text-align:center">
        <div style="margin-bottom: 5%; margin-top: 5%">
            <el-divider content-position="left"><h1>上传书籍</h1></el-divider>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="pb_list">
                <el-row>
                <div style="width:35%;position: absolute;right:0">
                <el-form-item label="上传头像" prop="userheadimg">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                </div>
                <div style="width: 50%; margin-right: 5%">
                    <el-form-item label="用户名"  prop="username" style="height: 80px">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                </div>
                </el-row>
                <row>
                <div style="width:35%;right:0;position: absolute;top:6rem">
                    <el-form-item label="书籍封面" prop="images">
                        <div style="margin-top: 15%" class="el-upload">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </el-form-item>
                </div>
                <div style="width: 50%; margin-right: 5%; height: 320px">
                    <div style="height: 80px; margin-bottom: 22px">
                        <el-form-item label="书籍名称" prop="title" class="el-form-item__content">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 80px; margin-bottom: 22px">
                        <el-form-item label="作者" prop="author" class="el-form-item__content">
                            <el-input v-model="ruleForm.author" placeholder="若有多个作者，中间请用；隔开"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 80px; margin-bottom: 22px">
                        <el-form-item label="页数" prop="pages" class="el-form-item__content">
                            <el-input v-model="ruleForm.pages"></el-input>
                        </el-form-item>
                    </div>
                </div>
                </row>

                <div style="width: 45%; float: right; margin-left: 10%">
                    <el-form-item label="出版社" prop="publisher">
                        <el-input v-model="ruleForm.publisher"></el-input>
                    </el-form-item>
                    <el-form-item label="ISBN13" prop="ISBN13">
                        <el-input v-model="ruleForm.ISBN13"></el-input>
                    </el-form-item>
                </div>
                <div style="width: 45%">
                    <div style="height: 80px; margin-bottom: 22px">
                        <el-form-item label="出版时间" prop="pubdate">
                            <el-input v-model="ruleForm.pubdate" placeholder="请按XXXX(年)-XX(月)格式输入"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 80px; margin-bottom: 22px">
                        <el-form-item label="价格" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item label="作者介绍" prop="author_intro">
                    <el-input type="textarea" v-model="ruleForm.author_intro" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input type="textarea" v-model="ruleForm.summary" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="目录" prop="catelog">
                    <el-input type="textarea" v-model="ruleForm.catelog" :rows="10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl:'',
                ruleForm: {
                    username: '',
                    title: '',
                    author: '',
                    publisher: '',
                    ISBN13: '',
                    pubyear: '',
                    price: '',
                    pages: '',
                    author_intro: '',
                    summary: '',
                    catelog: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名',trigger: 'blur' }
                    ],
                    ISBN13: [
                        { min: 13, max: 13, message: '输入格式不正确', trigger: 'blur' }
                    ],
                    userheadimg:[
                        { required: true, message: '请至少上传一张图片', trigger: 'blur'}
                    ],
                    title: [
                        { required: true, message: '请输入书名', trigger: 'blur' },
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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
            }
        }
    }
</script>

<style  lang="scss" scoped>
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
</style>