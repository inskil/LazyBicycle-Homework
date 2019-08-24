<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1" style="font-size: large">
        <MenuItem name="1" style="font-size: large">
            热门推荐
        </MenuItem>
        <MenuItem name="2" style="font-size: large">
            书籍
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                影视
            </template>
            <MenuGroup title="影视">
                <MenuItem name="3-1">电视剧</MenuItem>
                <MenuItem name="3-2">电影</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4" style="font-size: large">
            小组
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'dark'
            }
        }
    }
</script>

<style scoped>
</style>
