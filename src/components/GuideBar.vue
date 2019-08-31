<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" style="font-size: large" :active-name="this.active">
            <router-link :to="{name:'hot'}" style="color: aliceblue">
                <MenuItem name="hot" style="font-size: large">热门推荐</MenuItem>
            </router-link>
            <router-link :to="{name:'book'}">
                <MenuItem name="book" style="font-size: large">
                    书籍
                </MenuItem>
            </router-link>
            <router-link :to="{name:'movie'}">
                <MenuItem name="movie" style="font-size: large">
                    影视
                </MenuItem>
            </router-link>
            <router-link :to="{name:'group'}">
                <MenuItem name="group" style="font-size: large">
                    小组
                </MenuItem>
            </router-link>

            <div style="float: left; padding-left: 5rem">
                <div style="float: left; padding-right: 10px">
                    <Input v-model="searchVal" placeholder="搜索你感兴趣的书籍、影视和小组..." style="width: 20rem"
                           @on-enter="search_some()"/>
                </div>
                <div style="float: left">
                    <MenuItem name="search">
                        <i-button @click="search_some" type="ghost" shape="circle" icon="ios-search"/>
                    </MenuItem>
                </div>
            </div>

            <div style="font-size: large; width: 18rem; right:0.5rem; position:absolute">
                <div v-if="this.hasLogin">
                    <div style="float: left">
                        <span class="name"><Icon type="md-person"/> {{this.userinfo.username}}</span>
                    </div>
                    <div align="left" style="left: 1rem; position: relative">
                        <Dropdown>
                            <a href="javascript:void(0)">
                                <Avatar size="large" v-bind:src="this.userinfo.userheadimg"/>
                            </a>
                            <Dropdown-menu slot="list">
                                <router-link :to="{name:'mine'}">
                                    <Dropdown-item>个人信息</Dropdown-item>
                                </router-link>
                                <Dropdown-item><p @click="qiut">注销</p></Dropdown-item>
                                <router-link :to="{name:'login'}">
                                    <Dropdown-item>切换账号</Dropdown-item>
                                </router-link>
                            </Dropdown-menu>
                        </Dropdown>
                    </div>
                </div>
                <Menu v-else mode="horizontal" :theme="theme1">
                    <router-link :to="{name:'login'}">
                        <MenuItem name="5" style="font-size: large">
                            <Icon type="md-person"/>
                            登录
                        </MenuItem>
                    </router-link>
                    <router-link :to="{name:'register'}">
                        <MenuItem name="6" style="font-size: large">
                            <Icon type="md-person-add"/>
                            注册
                        </MenuItem>
                    </router-link>
                </Menu>
            </div>
        </Menu>
    </div>

</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                theme1: 'dark',
                searchVal: ''
            }
        },
        computed: {
            ...mapGetters([
                'hasLogin',
                'userinfo',
                'topicList'
            ]),
            active: function () {
                return this.$route.name
            }
        },
        methods: {
            search_some() {
                if (this.searchVal !== "") {
                    console.log(this.searchVal)
                    let path = '/search/' + this.searchVal
                    console.log('passsssssssss', path)
                    this.$router.push(path)
                } else {
                    this.$Notice.success({
                        title: "不能查找空内容"
                    });
                }

                this.searchVal = ''

            },
            to(toname) {
                console.log("ssssssssssssssss")
                this.$router.push({name: toname})
            },
            qiut: function () {
                console.log("qqqqqqqqqqq")
                this.$store.dispatch('clearInfo')
            }
        },
    }
</script>

<style scoped>
    .page {
        font-size: large;
        height: 4rem;
        width: 80%;
        float: left;
        background-color: #009999
    }

    .name {
        color: white;
        font-size: large;
        width: 10rem;
        text-align: right;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 1;
    }
</style>
