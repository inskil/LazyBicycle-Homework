<template>
    <div style="text-align:center">
        <div style="margin-top: 7%">
            <el-divider content-position="center" style="margin-top:10%"><h1>发布帖子</h1></el-divider>
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
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    desc: ''
                },
                gid: this.$route.params.gid,
                rules: {
                    name: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入帖子内容', trigger: 'blur'},
                        {min: 25, message: '帖子内容不得少于25个字', trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            ...mapGetters([
                'bookList',
                'userinfo',
            ]),
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            let tid = 0
                            await this.$axios.get('/topic/getnewtid',{gid:parseInt(this.gid)}).then(res => {
                                console.log(res)
                                tid = res.data.tid
                            }).catch(err => {
                                console.log(err)
                            })
                            let msg = {
                                gid: this.gid,
                                uid:this.userinfo.uid,
                                userheadimg:this.userinfo.userheadimg,
                                username:this.userinfo.username,
                                tid:tid,
                                title:this.ruleForm.name,
                                text:this.ruleForm.desc,
                            }
                            await this.$store.dispatch('addtopic', JSON.stringify({msg:msg}))
                            this.$Message.success('创建成功');
                            //this.$router.push('/group')
                        } catch (e) {
                            console.log(e)
                            this.$Message.error(e);
                            this.$Message.error('创建失败');
                        }
                    } else this.$Message.error('创建失败');
                })
            }
            ,
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm {
        height: 570px;
    }
</style>