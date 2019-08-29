<template>
    <div  style="text-align:center">
        <div style="margin-top: 7%">
            <el-divider content-position="left"  style="margin-top:10%"><h2>上传书籍</h2></el-divider>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="pb_list">
                <el-form-item label="你的姓名" prop="username">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="书籍名称" prop="title">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="ruleForm.name" placeholder="若有多个作者，中间请用；隔开"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="publisher">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="ISBN13" prop="ISBN13">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年份" prop="pubdate">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="页数" prop="pages">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="作者介绍" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>