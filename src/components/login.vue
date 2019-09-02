<template>
    <div style="text-align:center">
        <Divider style="margin-top:10%"><h1>登录</h1></Divider>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
            <FormItem label="用户名：" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="密码：" prop="passwd">
                <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('ruleCustom')">提交</Button>
                <Button @click="handleReset('ruleCustom')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<style  scoped>
    .form {
        top: 2rem;
        left: 32%;
        width: 30%;
        position: relative;
    }
</style>
<script>

    import {mapGetters, mapState} from "vuex";

    export default {
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
        computed: {
            ...mapGetters([
                'hasLogin',
            ]),
        },
        methods: {
            handleSubmit(name) {
                this.$refs['formCustom'].validate(async (valid) => {
                    if (valid) {
                        let param = {
                            username: this.formCustom.name,
                            pwd: this.formCustom.passwd
                        }
                        try {
                            await this.$store.dispatch('userLogin', param)
                            console.log(this.hasLogin)
                            if (this.hasLogin) {
                                this.$Message.success('登录成功!');
                                this.$router.push('/')
                            } else {
                                this.$Message.error('登录失败!');
                            }
                        } catch (e) {
                           console.log('登录失败!')
                        }

                    }
                });
            },
            handleReset(name) {
                this.$refs['formCustom'].resetFields();
            },

        }
    }
</script>
