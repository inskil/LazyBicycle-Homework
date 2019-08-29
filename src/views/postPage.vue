<template>
    <div  style="text-align:center">
        <div style="margin-top: 7%">
            <el-divider content-position="center"  style="margin-top:10%"><h1>发布帖子</h1></el-divider>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <div style="margin-top: 5%; margin-left:10%; width: 80%">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name" label-position></el-input>
                </el-form-item>
            </div>

            <div style="margin-top: 5%; margin-left:10%; width: 80%">
                <el-form-item label="内容" prop="desc">
                    <el-input type="textarea" :rows="15" v-model="ruleForm.desc"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布帖子</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入帖子内容', trigger: 'blur' },
                        { min: 25, message: '帖子内容不得少于25个字', trigger: 'blur' }
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
    .demo-ruleForm{
        height: 570px;
    }
</style>