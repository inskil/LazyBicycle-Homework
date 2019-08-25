<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="font-size: large;width: 80%;float: left; background-color: #009999">
            <MenuItem :to="{name:'hot'}" name="1" style="font-size: large">
                热门推荐
            </MenuItem>
            <MenuItem :to="{name:'book'}" name="2" style="font-size: large">
                书籍
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    影视
                </template>
                <MenuGroup title="影视">
                    <MenuItem :to="{name:'drama'}" name="3-1">电视剧</MenuItem>
                    <MenuItem :to="{name:'movie'}" name="3-2">电影</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem :to="{name:'group'}" name="4" style="font-size: large">
                小组
            </MenuItem>
            <div style="float: left">
                <div style="float: left; padding-right: 10px; left: 5rem;position: relative">
                    <Input v-model="searchVal" placeholder="搜索你感兴趣的书籍、影视和小组..." style="width: 20rem"
                           @on-enter="search_some()"/>
                </div>
                <div style="float: left;left: 5rem;position: relative">
                    <i-button type="ghost" shape="circle" icon="ios-search" @click="search_some()" :to="{name:'search'}"></i-button>
                </div>
            </div>
        </Menu>
        <div style="font-size: large; width: 20%; left:80%; position:absolute">
            <div v-if="login" style="background-color: #009999">
                <div style="float: left;width: 10rem">
                    <span style="color: white;font: 15px Arial;"><Icon type="md-person" /> {{user_name}}</span>
                </div>
                <div align="left">
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
            <Menu v-else mode="horizontal" :theme="theme1" style="background-color: #009999">
                <MenuItem :to="{name:'login'}" style="font-size: large">
                    <Icon type="md-person" /> 登录
                </MenuItem>
                <MenuItem :to="{name:'register'}" style="font-size: large">
                    <Icon type="md-person-add" /> 注册
                </MenuItem>
            </Menu>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                theme1: 'dark',
                user_head: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                user_name: '小魔仙全身变',
                login: false,
                searchVal: ""
            }
        },
        methods: {
            search_some() {
                if(this.searchVal !== "")
                {
                    this.$Notice.success({
                        title: "查找 " + this.searchVal + " 成功"
                    });
                }
                this.searchVal = ''
            }
        }
    }
</script>

<style scoped>
</style>
