<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="font-size: large">
            <router-link :to="{name:'hot'}" style="color: aliceblue">
                <MenuItem name="1" style="font-size: large">热门推荐</MenuItem>
            </router-link>
            <router-link :to="{name:'book'}">
                <MenuItem name="2" style="font-size: large">
                    书籍
                </MenuItem>
            </router-link>
            <Submenu name="3">
                <template slot="title">
                    影视
                </template>
                <MenuGroup title="影视">
                    <router-link :to="{name:'drama'}">
                        <MenuItem name="3-1">电视剧</MenuItem>
                    </router-link>
                    <router-link :to="{name:'movie'}">
                        <MenuItem name="3-2">电影</MenuItem>
                    </router-link>
                </MenuGroup>
            </Submenu>
            <router-link :to="{name:'group'}">
                <MenuItem name="4" style="font-size: large">
                    小组
                </MenuItem>
            </router-link>
            <div style="float: left">
                <div style="float: left; padding-right: 10px">
                    <Input v-model="searchVal" placeholder="Enter something..." style="width: 180px"
                           @on-enter="search_some()"/>
                </div>
                <div style="float: left">
                    <i-button type="ghost" shape="circle" icon="ios-search" @click="search_some()"></i-button>
                </div>

            </div>

            <div style="font-size: large; width: 20%; left:80%; position:absolute">
                <div v-if="login" style="background-color: #009999; height: 4rem">
                    <div style="float: left">
                        <span class="name"><Icon type="md-person"/> {{user_name}}</span>
                    </div>
                    <div align="left" style="left: 1rem; position: relative; top: 1rem">
                        <Dropdown>
                            <a href="javascript:void(0)">
                                <Avatar v-bind:src="user_head"/>
                            </a>
                            <Dropdown-menu slot="list">
                                <Dropdown-item>注销</Dropdown-item>
                                <Dropdown-item>切换账号</Dropdown-item>
                            </Dropdown-menu>
                        </Dropdown>
                    </div>
                </div>
                <Menu v-else mode="horizontal" :theme="theme1" >
                    <router-link :to="{name:'login'}" >
                    <MenuItem  style="font-size: large">
                        <Icon type="md-person"/>
                        登录
                    </MenuItem>
                    </router-link>
                    <router-link :to="{name:'register'}" >
                    <MenuItem  style="font-size: large">
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
    export default {
        data() {
            return {
                theme1: 'dark',
                tag: 1,
                user_head: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                user_name: '小魔仙全身变',
                login: false,
                searchVal: ""
            }
        },
        methods: {
            search_some() {
                if (this.searchVal !== "") {
                    this.$router.push({name:'search'})
                }
                this.$Notice.success({
                    title: "不能查找空内容"
                });
                this.searchVal = ''

            }
        }
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
        top: 1rem;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
        -webkit-line-clamp: 1;
    }
</style>
