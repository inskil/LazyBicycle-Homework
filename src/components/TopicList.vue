<template>
    <table class="topicList">
        <tr>
            <td align="left" style="width: 50%; padding-left: 1rem">讨论</td>
            <td style="width: 15%">作者</td>
            <td style="width: 10%">回应</td>
            <td align="right" style="width: 25%; padding-right: 1rem">最后回应</td>
        </tr>
        <tr v-for="topic in newList" v-if="topic.istop">
            <td align="left"><img src="https://img3.doubanio.com/pics/stick.gif"><router-link class="hotlink" :to="'/topic/'+topic.tid">{{topic.title}}</router-link></td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime |parseTime}}
                <Button v-if="isAdmin" type="error" shape="circle" icon="md-close" size="small"
                        style="height: 1.4rem;width: 1.4rem"></Button>
            </td>
        </tr>
        <tr v-for="topic in newList" v-if="!topic.istop">
            <td align="left"><router-link class="link" :to="'/topic/'+topic.tid">{{topic.title}}</router-link></td>
            <td>{{topic.username}}</td>
            <td>{{topic.review.length}}</td>
            <td align="right">
                {{topic.updatetime | parseTime}}
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
                return this.$route.params.id
            },
            newList: function () {
                let list = this.topicList.filter(item => item.gid==this.gid)
                return list.sort(function (a,b) {
                    return a.updatetime<b.updatetime?1:-1
                })
            }
        },
        methods: {}
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

    .link{
        color: black;
    }

    .link:hover{
        color: #2b85e4;
    }

    .hotlink{
        color: #e45659;
    }

    .hotlink:hover{
        color: #e40811;
    }
</style>
