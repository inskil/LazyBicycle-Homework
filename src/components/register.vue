<template>
    <div>
        <h1>注册</h1>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
            <FormItem label="用户名：" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码：" prop="passwd">
                <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码：" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck" placeholder="请确认密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('ruleCustom')">提交</Button>
                <Button @click="handleReset('ruleCustom')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入不一致'));
                } else {
                    callback();
                }
            };
            return {
                formCustom: {
                    name: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    name: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    passwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    passwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                console.log("函数开始了")
                this.$refs['formCustom'].validate((valid) => {
                    if (valid) {

                        const _this = this;
                        this.disablebtn = true;
                        this.loginText = "注册中...";
                        //this.$reqs就访问到了main.js中绑定的axios
                        this.$axios.post("/user/add", {
                            username: this.formCustom.name,
                            pwd: this.formCustom.passwd
                        }).then(function (result) {
                            //成功
                            console.log(result)
                            _this.disablebtn = false;
                            _this.loginText = "注册";
                            _this.$Message.success('注册成功!');
                        }).catch(function (error) {
                            //失败
                            _this.disablebtn = false;
                            _this.loginText = "注册"
                        })

                    } else {
                        this.$Message.error('注册失败!');
                    }
                })
            },
            handleReset(name) {
                this.$refs['formCustom'].resetFields();
            },

        }
    }
</script>


<style scoped>
    .form {
        top: 2rem;
        left: 32%;
        width: 30%;
        position: relative;
    }
</style>
