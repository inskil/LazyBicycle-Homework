<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1" style="font-size: large">
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
            <div style="float: left; padding-right: 10px">
                <Input v-model="searchVal" placeholder="Enter something..." style="width: 180px"
                       @on-enter="search_some()"/>
            </div>
            <div style="float: left">
                <i-button type="ghost" shape="circle" icon="ios-search" @click="search_some()" :to="{name:'search'}"></i-button>
            </div>

        </div>
        <div style="float:  right">
            <div v-if="login" style="padding-right: 50px; float: bottom">
                <div style="margin-right: 15px ;float: left">
                    <span style="color: white;font: 15px Arial">{{user_name}}   </span>
                </div>
                <div style="float: right">
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
            <div v-else style="padding-right: 50px; float: bottom">
                <div>
                    <a v-bind:href="loginvue" style="color: white;font: 15px Arial">注册/登录</a>
                </div>
            </div>
        </div>
    </Menu>
</template>
<script>

    export default {
        data() {
            return {
                theme1: 'dark',
                user_head: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                user_name: '小魔仙全身变',
                login: true,
                loginvue: '@src/components/Carousel.vue',
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
