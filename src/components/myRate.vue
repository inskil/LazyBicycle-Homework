<template>
    <Rate disabled allow-half v-model="star"/>
</template>

<script>
    export default {
        name: "myRate",
        props:["message"],
        data(){
            return{
                star:0
            }
        },
        created(){
            this.star = this.message /2
        }
    }
</script>

<style scoped>

</style>