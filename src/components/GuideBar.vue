<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            热门推荐
        </MenuItem>
        <MenuItem name="2">
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
        <MenuItem name="4">
            小组
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        }
    }
</script>

<style scoped>

</style>