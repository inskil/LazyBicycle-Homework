<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1" style="font-size: large">

        <router-link   :to="{name:'hot'}" style="color: aliceblue">
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
        <MenuItem :to="{name:'group'}" name="4" style="font-size: large">
            小组
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data() {
            return {
                theme1: 'dark',
                tag:1
            }
        }
    }
</script>

<style scoped>
</style>
