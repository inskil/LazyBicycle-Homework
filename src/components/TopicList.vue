<template>
    <table class="topicList">
        <tr>
            <td align="left" style="width: 50%; padding-left: 1rem">讨论</td>
            <td style="width: 15%">作者</td>
            <td style="width: 10%">回应</td>
            <td align="right" style="width: 25%; padding-right: 1rem">最后回应</td>
        </tr>
        <tr v-for="topic in newList" v-if="topic.istop">
            <td align="left"><img src="https://img3.doubanio.com/pics/stick.gif">{{topic.title}}</td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime}}
                <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                        style="height: 1.4rem;width: 1.4rem"></Button>
            </td>
        </tr>
        <tr v-for="topic in newList" v-if="!topic.istop">
            <td align="left">{{topic.title}}</td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime}}
                <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                        style="height: 1.4rem;width: 1.4rem"></Button>
            </td>
        </tr>
    </table>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "TopicList",
        props: {
            isAdmin: {
                type: Boolean,
                default: false
            },
        //     key:{
        //         type:String,
        //         default: 'updatetime'
        //     }
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'topicList',
            ]),
            gid:function () {
                return this.$router.params.id
            },
            newList: function () {
                let list = this.topicList.filter(item => item.gid==this.gid)
                return this.sortKey(list, 'updatetime');
            }
        },
        methods: {
            sortKey(array, key) {
                return array.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? 1 : (x > y) ? -1 : 0)
                })
            }
        }
    }
</script>

<style scoped>
    .topicList {
        word-wrap: break-word;
        word-break: break-word;
        width: 100%;
        font-size: larger;
    }

    td {
        border-bottom: 1px dashed #DDDDDD;
        padding: 0.3rem;
    }
</style>
