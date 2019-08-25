<template>
    <Menu active-name="all">
        <MenuItem name="all" class="search-menu"><Icon type="ios-paper" />全部</MenuItem>
        <MenuItem name="book" class="search-menu"><Icon type="ios-book" />书籍</MenuItem>
        <MenuItem name="movie" class="search-menu"><Icon type="ios-film" />影视</MenuItem>
        <MenuItem name="group" class="search-menu"><Icon type="ios-people" />小组</MenuItem>
        <MenuItem name="discussion" class="search-menu"><Icon type="ios-text" />讨论</MenuItem>
    </Menu>
</template>

<script>
    export default {
        name: "SearchMenu"
    }
</script>

<style scoped>

</style>
