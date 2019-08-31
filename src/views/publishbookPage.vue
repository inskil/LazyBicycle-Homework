<template>
    <div style="text-align:center">
        <div style="margin-bottom: 5%; margin-top: 5%">
            <el-divider content-position="left"><h1>上传书籍</h1></el-divider>
        </div>
        <div style="width: 80%; margin-left: 10%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="pb_list">
                <el-row>
                    <!--                <div style="width:35%;position: absolute;right:0;top:7rem">-->
                    <!--                <el-form-item label="上传头像" prop="userheadimg">-->
                    <!--                    <el-upload-->
                    <!--                            class="avatar-uploader"-->
                    <!--                            action="/api/upload"-->
                    <!--                            :show-file-list="false"-->
                    <!--                            :on-success="handleAvatarSuccess"-->
                    <!--                            :before-upload="beforeAvatarUpload">-->
                    <!--                        <img v-if="userheadimg" :src="userheadimg" class="avatar">-->
                    <!--                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--                    </el-upload>-->
                    <!--                </el-form-item>-->
                    <!--                </div>-->
                    <!--                    <div style="width: 50%; margin-right: 5%">-->
                    <!--                        <el-form-item label="用户名"  prop="username" style="height: 80px">-->
                    <!--                            <el-input v-model="ruleForm.username"></el-input>-->
                    <!--                        </el-form-item>-->
                    <!--                    </div>-->
                    <div style="height: 80px; margin-bottom: 22px;width: 50%; margin-right: 5%">
                        <el-form-item label="书籍名称" prop="title" class="el-form-item__content">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 80px; margin-bottom: 22px;width: 50%; margin-right: 5%">
                        <el-form-item label="作者" prop="author" class="el-form-item__content">
                            <el-input v-model="ruleForm.author" placeholder="若有多个作者，中间请用；隔开"></el-input>
                        </el-form-item>
                    </div>
                </el-row>
                <row style="height: 550px">
                    <div style="width:35%;right:0;position: absolute;top:1rem">
                        <el-form-item label="书籍封面" prop="image">
                            <el-upload
                                    v-model="ruleForm.image"
                                    class="avatar-uploader1"
                                    action="/api/upload"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar1">
                                <i v-else class="el-icon-plus avatar-uploader1-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div style="width: 50%; margin-right: 5%; height: 320px">

                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="页数" prop="pages" class="el-form-item__content">
                                <el-input v-model="ruleForm.pages"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="出版社" prop="publisher">
                                <el-input v-model="ruleForm.publisher"></el-input>
                            </el-form-item>
                        </div>
                        <div style="height: 80px; margin-bottom: 22px">
                            <el-form-item label="ISBN" prop="isbn13">
                                <el-input v-model="ruleForm.isbn13"></el-input>
                            </el-form-item>
                        </div>
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
                </row>

                <el-form-item label="作者介绍" prop="author_intro">
                    <el-input type="textarea" v-model="ruleForm.author_intro" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input type="textarea" v-model="ruleForm.summary" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="目录" prop="catalog">
                    <el-input type="textarea" v-model="ruleForm.catalog" :rows="10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">上传书籍</el-button>
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
                disabled: false,
                // userheadimg:'',
                img:'',
                ruleForm: {
                    // username: '',
                    title: '',
                    author: '',
                    publisher: '',
                    isbn13: '',
                    pubdate: '',
                    price: '',
                    pages: '',
                    author_intro: '',
                    summary: '',
                    catalog: '',
                    image:''
                },
                rules: {
                    // username: [
                    //     {required: true, message: '请输入用户名', trigger: 'blur'}
                    // ],
                    isbn13: [
                        {required: true, message: '请输入ISBN', trigger: 'blur'},
                        {min: 13, max: 13, message: '输入格式不正确', trigger: 'blur'}
                    ],
                    // userheadimg:[
                    //     { required: true, message: '请上传图片', trigger: 'blur'}
                    // ],
                    // images:[
                    //     { required: true, message: '请上传图片', trigger: 'blur'}
                    // ],
                    title: [
                        {required: true, message: '请输入书名', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '请输入作者', trigger: 'blur'}
                    ],
                    publisher:[
                        {required: true, message: '请输入出版社', trigger: 'blur'}
                    ],
                    pages:[
                        {required: true, message: '请输入页数', trigger: 'blur'}
                    ],
                    author_intro:[
                        {required: true, message: '请输入作者介绍', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '请输入摘要', trigger: 'blur'}
                    ],
                    catalog: [
                        {required: true, message: '请输入目录', trigger: 'blur'}
                    ],
                    price:[
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    pubdate:[
                        {required: true, message: '请输入出版时间', trigger: 'blur'}
                    ],
                    image:[
                        {required: true, message: '请上传封面', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            let bid = 0
                            await this.$axios.post('/getnewbid').then(res => {
                                console.log(res)
                                bid = res.data.bid
                            }).catch(err => {
                                console.log(err)
                            })
                            let msg = this.ruleForm
                            msg.images = {
                                large: this.img
                            }
                            let data = {
                                isbn13: this.ruleForm.isbn13,
                                bid: bid,
                                bookmsg: msg
                            }
                            await this.$axios.post('/addbook ', data).then(res => {
                                console.log('addbook', res)
                                if (res.data.id >0) {
                                    this.$Message.success('创建成功');
                                    this.$router.push('/bookDetail/'+res.data.id)
                                }
                            })
                        } catch (e) {
                            console.log(e)
                            this.$Message.error(e);
                        }
                    } else {
                        this.$Message.error("创建失败，请检查表格是否符合要求");
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // handleAvatarSuccess(res, file) {
            //     this.userheadimg = URL.createObjectURL(file.raw);
            // },
            handleAvatarSuccess(res, file) {
                this.ruleForm.image = URL.createObjectURL(file.raw);
                this.img =  res.data.file
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
            ,

        }
    }
</script>

<style lang="scss" scoped>
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

    .avatar-uploader1 {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 202.5px;
        height: 300px;
    }

    .avatar-uploader1:hover {
        border-color: #409EFF;
    }

    .avatar-uploader1-icon {
        font-size: 28px;
        color: #8c939d;
        width: 202.5px;
        height: 300px;
        line-height: 300px;
        text-align: center;
    }

    .avatar1 {
        width: 202.5px;
        height: 300px;
        display: block;
    }
</style>
